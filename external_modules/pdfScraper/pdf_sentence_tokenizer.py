"""
__authors__ = "Michael Falgien"
__version__ = "1.0"
__email__ = "mfalgien@gmail.com"
__date__ = "1/19/2019"
"""

import nltk

from nltk.tokenize import sent_tokenize, RegexpTokenizer
import nltk.data
from table_driver import convert_pdf_to_txt_looper, get_num_pages
import re


# list of known analysis techniques (not cap sensitive)
lexicon = ['analysis', 'INAA', 'activation', 'neutron',
           'LA-ICP-MS', 'spectrophometry', 'radiochemical', 'RNAA']

# Main driver of finding the analysis techniques and returning text from pdfs


def sentence_tokenize(paper):
    # get page numbers
    total_pages = get_num_pages(paper)

    # get all text from pdf
    entire_pdf = list()
    for i in range(total_pages):
        entire_pdf.append(convert_pdf_to_txt_looper(paper, i))

    # join list as string
    entire_pdf_string = join_text(entire_pdf)

    # filter text
    filtered_text = replace_char(entire_pdf_string)

    # Tokenize by sentence
    sent_dectector = nltk.data.load('tokenizers/punkt/english.pickle')
    processed_text = sent_dectector.tokenize(filtered_text)

    final_sent = find_analysis_fragments(processed_text)

    return final_sent


def regexp_filter(text):
    string = ''
    for words in text:
        tokenizer = RegexpTokenizer(r'\w+|\$[\d\.]+|\S+')
        string += tokenizer.tokenize(words) + ' '
    return text

# Replace new line characters in words


def replace_char(text):
    string = ''
    for words in text.split():
        string += words.replace(r'\n', ' ') + ' '
    return string

# Join a list of text as a string


def join_text(text):
    entire_string = ' '.join(str(v) for v in text)
    return entire_string

# Flatten a list


def flatten_list(_list):
    flat_list = list()
    for sublist in _list:
        if sublist != []:
            flat_list.append(sublist)
    return flat_list

# compares words in sentences to words that exist in the lexicon
# if a word is found, the entire sentence is added


def find_analysis_fragments(paper):
    analysis_list = list()
    for sentence in paper:
        for words in sentence.split():
            for lex in lexicon:
                if words.lower() == lex.lower():
                    if sentence not in analysis_list:
                        analysis_list.append(sentence)

    if len(analysis_list) == 0:
        analysis_list = ['No results found']

    analysis_string = convert_list_to_string(analysis_list)
    return analysis_string

# Converts a list to string for easier reading


def convert_list_to_string(_list):
    final_string = ''
    for i in range(len(_list)):
        final_string += _list[i] + "\n\n"
    return final_string
