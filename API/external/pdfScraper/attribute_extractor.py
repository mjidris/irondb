#!/usr/bin/env python3

"""
attribute_extractor.py: Extracts paper attributes from the text of a pdf using NLP.
Attributes include: title, authors, source (journal, volume, issue), and publishing date.
"""
__authors__ = "Hajar Boughoula, Mohamed Idris"
__version__ = "2.3"
__email__ = "hajar.boughoula@gmail.com, m4idris@gmail.com"
__date__ = "02/06/19"

import io
import os
import re
import string

import nltk
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from rake_nltk import Rake, Metric

PATH = os.path.abspath('pdfs') + '/'

# extracts authors from the first page of the pdf using NLTK named entity recognition
def authors_extract(pdf_name):
	page = convert_pdf_to_txt(PATH + pdf_name).replace(source_extract(pdf_name), "")
	relevant_text = ""
	if ("Abstract" in page) or ("Keywords:" in page):
		page = page.split("Abstract")[0].split("Keywords:")[0]
	title = title_extract(pdf_name)
	if (title != "") and (title in page):
		relevant_text = page.split(title)[1]
	tokenized = stage_text(relevant_text)
	tagged = nltk.pos_tag(tokenized)
	nerd = nltk.ne_chunk(tagged)
	line_index = 0
	authors_full = ""
	authors = ""

	###########################################################################
	# OPTIMIZE: use recursion of author detection to check for multiline authors
	###########################################################################
	for line in relevant_text.split('\n\n'):
		for chunk in nerd:
			if type(chunk) == nltk.tree.Tree:
				if chunk.label() == 'PERSON' and authors_full == "":
					english_author = " ".join([leaf[0] for leaf in chunk.leaves()])
					if ((english_author in line) and (len(line.split()) > 1)
							and ("university" not in line.lower()) and ("institute" not in line.lower())):
						authors_full = line
					if authors_full.endswith(","):
						authors_full += relevant_text.split('\n\n')[line_index + 1]
		if authors_full == "":
			for word in tagged:
				if word[0] != ".":
					if ((word[0] not in nltk.corpus.words.words()) and (word[1] == 'NNP')
							and (word[0] in line) and (len(line.split()) > 1)
							and ("university" not in line.lower()) and ("institute" not in line.lower())):
						authors_full = line
					if authors_full.endswith(","):
						authors_full += relevant_text.split('\n\n')[line_index + 1]
		line_index += 1

	if authors_full != "":
		for element in authors_full:
			if (element.isdigit() or element == "*" or element == "∗"
					or element == "†" or element == "‡"):
				authors_full = authors_full.replace(element, "")
		authors_full = authors_full.replace(" and", ",")
		authors_full = authors_full.replace(" ,", ",")
		authors_full = authors_full.replace(",,", ",")
		superscripts = ""
		russians = ""
		begin = 0
		end = 3
		for author in authors_full.split(','):
			if len(author) > 0:
				superscripts += author[-1]
		while end <= len(superscripts):
			if superscripts[begin:end].lower() in string.ascii_lowercase:
				russian_authors = ""
				for author in authors_full.split(','):
					russian_authors += author[:-1] + ','
				if russian_authors.endswith(","):
					russian_authors = russian_authors[:-1]
				return russian_authors
			else:
				begin += 1
				end += 1

	# using truncated author(s)
	# authors_tagword = truncated_authors(pdf_name).split()[1].replace(",", "")
	# authors_index = (relevant_text.lower()).find(authors_tagword.lower())
	# authors_full = relevant_text[:authors_index].rsplit('\n\n', 1)[1] + relevant_text[authors_index:].split('\n', 1)[0]

	for name in authors_full.split():
		authors += name + " "
	if authors.endswith(" "):
		authors = authors[:-1]

	return authors


# extracts publishing date from the pdf text using RegEx
def date_extract(pdf_name):
	page = convert_pdf_to_txt(PATH + pdf_name)
	relevant_text = page.split("Abstract")[0].lower()
	source = source_extract(pdf_name)
	date = ""

	if "publish" in relevant_text:
		relevant_text = relevant_text.rsplit("publish", 1)[1]
	elif "available" in relevant_text:
		relevant_text = relevant_text.rsplit("available", 1)[1]
	elif "accept" in relevant_text:
		relevant_text = relevant_text.rsplit("accept", 1)[1]

	date = re.search(r'[1-2][0-9]{3}', source)
	if date != None:
		while (int(date.group()) < 1665) or (int(date.group()) > 2222):
			source = source.replace(date.group(), "")
			date = re.search(r'[1-2][0-9]{3}', source)
	else:
		date = re.search(r'[1-2][0-9]{3}', relevant_text)

	if date != None:
		date = date.group()
	else:
		date = ""

	return date


def issue_extract(pdf_name):
	source = source_extract(pdf_name).replace(",", "").replace(".", "")
	issue = ""

	if len(source) > 0:
		tagwords = [" no ", " no. ", " No ", " No. "]
		for tag in tagwords:
			if tag in source:
				vol_regex = re.findall(r'%s(\d+)' % tag, source, re.IGNORECASE)
				if len(vol_regex) > 0:
					issue = vol_regex[0]

	return issue


def journal_extract(pdf_name):
	source = source_extract(pdf_name)
	journal = ""

	if len(source) > 0:
		segmented = source.split(",")
		if len(segmented) > 1:
			for phrase in segmented:
				if phrase.replace(" ", "").isalpha():
					journal = phrase
		else:
			for word in segmented[0].split():
				if word.isalpha():
					journal += word + " "

		tagwords = [" vol ", " vol. ", " Vol ", " Vol. ",
		            " no ", " no. ", " No ", " No. ",
		            "published in", "Published in"]
		for tag in tagwords[0:8]:
			journal = journal.split(tag)[0]
		for tag in tagwords[8:10]:
			if tag in journal:
				journal = journal.split(tag)[1]
		if journal.startswith(" "):
			journal = journal[1:]
		if journal.endswith(" "):
			journal = journal[:-1]

	return journal


# extracts full title from the first page of the pdf using RAKE and NLTK
def title_extract(pdf_name):
	page = convert_pdf_to_txt(PATH + pdf_name).replace(source_extract(pdf_name), "")
	if ("Abstract" in page) or ("Keywords:" in page):
		relevant_text = page.split("Abstract")[0].split("Keywords:")[0]
	else:
		relevant_text = page
	kywrd_tagword = " "
	if "introduction" in page.lower():
		kywrd_tagword = page[page.find("introduction")]
	elif "doi" in page.lower():
		kywrd_tagword = page[page.find("doi")]
	keywords = keyword_extract(pdf_name, "Abstract", kywrd_tagword)
	title_full = ""
	date = date_extract(pdf_name)

	##########################################################################
	# OPTIMIZE: Organize keywords list by most significant instead of frequency
	##########################################################################
	if len(keywords) > 0:
		for tpl in keywords:
			for kywrd in tpl[1].split():
				for line in relevant_text.split('\n\n'):
					if ((1 < len(line.split()) < 20) and ("www." not in line.lower()) and (date not in line) and (
							str(int(date) + 1) not in line) and (str(int(date) - 1) not in line)):
						if any(kywrd.lower() == wrd.lower() for wrd in line.split()):
							title_full = line.split("Alex")[0]  # dammit Alex
							return title_full

	# using truncated title
	# title_split = truncated_title(pdf_name).split()
	# title_tagword = title_split[0] + ' ' + title_split[1]
	# title_index = (relevant_data.lower()).find(title_tagword.lower())
	# title_full = relevant_data[:title_index].rsplit('\n\n', 1)[1] + relevant_data[title_index:].split('\n', 1)[0]

	return title_full


def volume_extract(pdf_name):
	source = source_extract(pdf_name).replace(",", "").replace(".", "")
	journal = journal_extract(pdf_name).replace(",", "").replace(".", "")
	volume = ""

	if len(source) > 0:
		tagwords = [" vol ", " vol. ", " Vol ", " Vol. "]
		for tag in tagwords:
			if tag in source:
				vol_regex = re.findall(r'%s(\d+)' % tag, source, re.IGNORECASE)
				volume = vol_regex[0]

	if (volume == "") and (len(journal) > 0) and (journal in source):
		vol_num = source.split(journal)[1].split()[0]
		if any(char.isdigit() for char in vol_num):
			volume = vol_num

	return volume


# retrieves raw text from any given pdf
def convert_pdf_to_txt(path, pageNo=0):
	text = ""
	rsrcmgr = PDFResourceManager()
	retstr = io.StringIO()
	codec = 'utf-8'
	laparams = LAParams()
	device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
	fp = open(path, 'rb')
	interpreter = PDFPageInterpreter(rsrcmgr, device)

	for page in PDFPage.get_pages(fp, pagenos=[pageNo], check_extractable=True):
		pageNo += 1
		interpreter.process_page(page)
		text = retstr.getvalue()

	fp.close()
	device.close()
	retstr.close()

	return text


# stages the relevant parts of the pdf using NLTK sentence tokenization
def stage_text(txt):
	sentences = []
	try:
		sentences = nltk.word_tokenize(txt)
	except LookupError:
		nltk.download('punkt')
		nltk.download('averaged_perceptron_tagger')  # pos_tag dependency
		nltk.download('maxent_ne_chunker')  # ne_chunk dependency
		nltk.download('words')  # ne_chunk dependency
		print("\n")
		print("                  ******************************************")
		print("                  DEPENDENCIES DOWNLOADED. PLEASE RUN AGAIN")
		print("                  ******************************************\n\n")

	return sentences


# extracts ranked key phrases from any text between two tagwords using RAKE
def keyword_extract(pdf_name, below=" ", above=" ", page_no=0):
	page = convert_pdf_to_txt(PATH + pdf_name, page_no)
	relevant_text = ''
	if below == " " and above == " ":
		relevant_text = page
	else:
		if below in page:
			relevant_text = page.split(below)[1]
		if above in page:
			relevant_text = page.split(above)[0]

	r = Rake(ranking_metric=Metric.WORD_FREQUENCY)
	keywords = r.extract_keywords_from_text(relevant_text)  # TODO: Remove or refactor unused keywords
	ranked_kywrds = r.get_ranked_phrases()  # TODO: Remove or refactor unused ranked keywords
	scored_kywrds = r.get_ranked_phrases_with_scores()

	return scored_kywrds


# extracts truncated title from top of any page in the pdf using magic
def truncated_title(pdf_name):
	page_num_title = 1
	random_page = convert_pdf_to_txt(PATH + pdf_name, page_num_title)

	title_trunc = random_page.split('\n\n', 1)[0]
	while (title_trunc.split()[0].isdigit()) or (('Table' in title_trunc) is True):
		page_num_title += 1
		title_trunc = truncated_title(pdf_name)

	return title_trunc.replace('\n', "")


# extracts truncated authors from top of any page in the pdf using the truncated title
def truncated_authors(pdf_name):
	page_num_authors = 1
	random_page = convert_pdf_to_txt(PATH + pdf_name, page_num_authors)

	authors_trunc = random_page.split('\n\n', 2)
	while authors_trunc[0] in truncated_title(pdf_name):
		page_num_authors += 1
		authors_trunc = truncated_authors(pdf_name)

	if (authors_trunc[0].replace(" ", "")).isdigit():
		return authors_trunc[1]

	return authors_trunc[0]


# extracts journal source from the pdf text using tagwords
def source_extract(pdf_name):
	page = convert_pdf_to_txt(PATH + pdf_name)
	relevant_text = page.split("Abstract")[0]
	source = ""
	journal_tagword = "journal"
	volume_tagword = " vol "
	issue_tagword = " no "
	line_clean = ""

	######################################################################
	# OPTIMIZE: Pull out journal names from online catalogue and find match
	######################################################################
	for line in relevant_text.split('\n\n'):
		if (len(line.split()) > 1 and ((journal_tagword in line.lower())
		                               or (volume_tagword in line.lower().replace(".", ""))
		                               or (issue_tagword in line.lower().replace(".", ""))
		                               or ("acta" in line.lower()) or ("erde" in line.lower()))):
			for word in line.split():
				line_clean += word + " "
			source = line_clean

	if (("copyright" in source.lower()) and
			(volume_tagword not in source.lower().replace(".", "").split("copyright")[1])):
		source = source.split("Copyright")[0]

	return source
