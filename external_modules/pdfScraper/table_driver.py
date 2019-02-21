"""
table_driver.py: The purpose of this file is to develop the entire journal scraper functionality with the touch of a button. This
is simply meant to help devlop python parts of the web application. This is not shipable code.

__authors__ = "Joshua Johnson"
__version__ = "1.0"
__email__ = "jdjohn43@asu.edu"
__date__ = "11/7/18"
"""

import PyPDF2
from tabula import read_pdf
import pandas as pd
import re
pd.options.display.max_rows = 999
pd.options.display.max_columns = 999

import io
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage


master_json = ""
pages_with_tables = []
pages_with_continue = []
master_dict_tables = {}
pdf = ["pdfs/WassonandRichardson_GCA_2011.pdf",
       "pdfs/WassonandChoe_GCA_2009.pdf",
       "pdfs/Wasson_GCA_2017.pdf",
       "pdfs/WassonandChoi_2003.pdf",
       "pdfs/Litasov2018_Article_TraceElementCompositionAndClas.pdf",
       "pdfs/Wasson_2010.pdf",
       "pdfs/Wasson_2004.pdf",
       "pdfs/Wassonetal_GCA_2007.pdf",
       "pdfs/Ruzicka2014.pdf",
       "pdfs/WassonandKallemeyn_GCA_2002.pdf",
       "pdfs/RuzickaandHutson2010.pdf",
       "pdfs/spinTest.pdf"]

chosen_pdf = pdf[10]


# START 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT
# START 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT


# START This function imports raw text import from a chosen pdf request.
def convert_pdf_to_txt(path, pageNo=0):
    text = ""
    rsrcmgr = PDFResourceManager()
    retstr = io.StringIO()
    device = TextConverter(rsrcmgr, retstr, codec='utf-8', laparams=LAParams())
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
# END This function imports raw text import from a chosen pdf request.

# START This function puts each page of text in its own slot in an array of strings
def convert_pdf_to_txt_looper(path, total_pages):
    individual_pages = []
    for check in range(total_pages):
        individual_pages.append(convert_pdf_to_txt(path, check))
    return individual_pages
# END This function puts each page of text in its own slot in an array of strings

# END 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT
# END 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT 0. GETTING THE TEXT
#
#

# START 4. REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS
# START 4. REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS


def row_by_row(mdf):
    i,j = mdf.shape
    print("Rows: " + str(i) + " Cols: " + str(j))
    for row in reversed(range(mdf.shape[0])):
        row_remove = 0
        row_null = 0
        for col in range(mdf.shape[1]):
            if str(mdf.iloc[row][col]) == "REMOVE":
                row_remove += 1
            if str(mdf.iloc[row][col]) == "nan":
                row_null += 1
            # print(str(mdf.iloc[row][col]))
            # print("THIS IS REMOVE TALLY: " + str(row_remove))
            # print("THIS IS NULL TALLY: " + str(row_null))
            # print("THIS IS Amount of Rows: " + str(mdf.shape[0]))
            # print(mdf)
        if mdf.shape[1] - (row_remove + row_null) < 2:
            mdf = mdf.drop(row)
            if mdf.empty:
                return "DataFrame is Empty."
    return mdf

def column_by_column(mdf):
    for col in reversed(range(mdf.shape[1])):
        col_remove = 0
        col_null = 0
        for row in range(mdf.shape[0]):
            if str(mdf.iloc[row][col]) == "REMOVE":
                col_remove += 1
            if str(mdf.iloc[row][col]) == "nan":
                col_null += 1
        #     print(str(mdf.iloc[row][col]))
        #     print("THIS IS REMOVE TALLY: " + str(col_remove))
        #     print("THIS IS NULL TALLY: " + str(col_null))
        #     print("THIS IS Amount of Col: " + str(mdf.shape[0]))
        #     print("THIS IS Cols - bads: " + str(mdf.shape[0] - (col_remove + col_null)))
        # print("This is Column Number:" + str(col))
        # print("This is cols divided by bads: " + str(mdf.shape[0]/(col_remove + col_null)))
        print(mdf)
        if mdf.shape[0] - (col_remove + col_null) < 2 or(col_remove + col_null)/ mdf.shape[0] > .85:
            mdf = mdf.drop(mdf.columns[col], axis=1)
            if mdf.empty:
                return "DataFrame is Empty."
    return mdf


# END 4. REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS
# END 4. REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS REMOVING BAD ROWS and COLS

# START Get number of Pages
total_pages = PyPDF2.PdfFileReader(open(chosen_pdf, 'rb')).numPages
# START Get number of Pages
print("There are " + str(total_pages) + " pages in this document.")

# START get text from pdf
text = convert_pdf_to_txt_looper(chosen_pdf, total_pages)
# End get text from pdf.

# START Getting pages that have tables on them. looking for page 15
for iterate in range(total_pages):
    splitted = text[iterate].split()
    if splitted[0] == "Table" or text[iterate].find('\nTable ') > 0 or bool(re.search(r'\w\n\w\n\w\n', text[iterate])):
        print("############# Table exists on Page " + str(iterate + 1) + " #############" + "\n Word: "
              + str(text[iterate].find('\nTable ')))
        pages_with_tables.append(iterate + 1)
        # print("This is Pages With Tables: " + str(pages_with_tables))

if pages_with_tables:
    for page in pages_with_tables:
        if re.search(r'Continued\S\n', text[page], re.IGNORECASE):
            pages_with_continue.append(page + 1)
print("Pages with CONTINUED: " + str(pages_with_continue))

# END Getting pages that have tables on them.

# START Get tables 1 page at a time.
tables_rec_from_page = read_pdf(chosen_pdf, output_format="dataframe", encoding="utf-8",  multiple_tables=True,
                                pages=pages_with_tables, silent=True)

print(len(tables_rec_from_page))

# END Get tables 1 page at a time.

# Start Marking the fields for removal
if len(tables_rec_from_page) > 0:
    for df in tables_rec_from_page:
        for x in range(df.shape[0]):
            for y in range(df.shape[1]):
                if len(str(df[y][x])) > 20:
                    df[y][x] = "REMOVE"
print("START THE MARKING START THE MARKING START THE MARKING START THE MARKING START THE MARKING START THE MARKING ")
ind = 3
# print(tables_rec_from_page[ind])


# End Marking the fields for removal

print("Length of array with DFs: " + str(len(tables_rec_from_page)))
i, j = tables_rec_from_page[ind].shape
print("Rows: " + str(i) + " Cols: " + str(j))
print("row_by_row************************************************************************************************************")
tables_rec_from_page[ind] = row_by_row(tables_rec_from_page[ind])

# print(tables_rec_from_page[ind])
# print("column_by_column************************************************************************************************************")
#tables_rec_from_page[ind] = column_by_column(tables_rec_from_page[ind])
#
#


# print(tables_rec_from_page[ind])


# table_cleaned = process_tables_clean(table_marked)
# # print(table_cleaned)
# return json.loads((table_cleaned.to_json(double_precision=10, force_ascii=True,date_unit='ms', lines=False)))

