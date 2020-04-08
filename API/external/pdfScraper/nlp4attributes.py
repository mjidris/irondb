#!/usr/bin/env python3

"""
nlp4metadata.py: Extracts paper attributes from the text of a pdf using NLP.
Attributes include: title, authors, source (journal, volume, issue), and publishing date.
"""
__authors__ = "Hajar Boughoula, Mohamed Idris"
__version__ = "2.3"
__email__ = "hajar.boughoula@gmail.com, m4idris@gmail.com"
__date__ = "02/06/19"

import json
import os
import sys

import nltk

from attribute_extractor import authors_extract
from attribute_extractor import date_extract
from attribute_extractor import issue_extract
from attribute_extractor import journal_extract
from attribute_extractor import title_extract
from attribute_extractor import volume_extract

"""
======================================================================================================================
======================================================================================================================
 *
 * NNNNNNNN        NNNNNNNNLLLLLLLLLLL             PPPPPPPPPPPPPPPPP
 * N:::::::N       N::::::NL:::::::::L             P::::::::::::::::P
 * N::::::::N      N::::::NL:::::::::L             P::::::PPPPPP:::::P
 * N:::::::::N     N::::::NLL:::::::LL             PP:::::P     P:::::P
 * N::::::::::N    N::::::N  L:::::L                 P::::P     P:::::P
 * N:::::::::::N   N::::::N  L:::::L                 P::::P     P:::::P
 * N:::::::N::::N  N::::::N  L:::::L                 P::::PPPPPP:::::P
 * N::::::N N::::N N::::::N  L:::::L                 P:::::::::::::PP
 * N::::::N  N::::N:::::::N  L:::::L                 P::::PPPPPPPPP
 * N::::::N   N:::::::::::N  L:::::L                 P::::P
 * N::::::N    N::::::::::N  L:::::L                 P::::P
 * N::::::N     N:::::::::N  L:::::L         LLLLLL  P::::P
 * N::::::N      N::::::::NLL:::::::LLLLLLLLL:::::LPP::::::PP
 * N::::::N       N:::::::NL::::::::::::::::::::::LP::::::::P
 * N::::::N        N::::::NL::::::::::::::::::::::LP::::::::P
 * NNNNNNNN         NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLPPPPPPPPPP
 *
 *
 * PPPPPPPPPPPPPPPPP       OOOOOOOOO      WWWWWWWW               WWWWWWWWEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR
 * P::::::::::::::::P    OO:::::::::OO    W::::::W               W::::::WE::::::::::::::::::::ER::::::::::::::::R
 * P::::::PPPPPP:::::P OO::::::::::::::OO W::::::W               W::::::WE::::::::::::::::::::ER::::::RRRRRR:::::R
 * PP:::::P     P:::::PO:::::::OOO:::::::OW::::::W               W::::::WEE::::::EEEEEEEEE::::ERR:::::R     R:::::R
 *   P::::P     P:::::PO::::::O   O::::::OW::::::W     WWWWW     W::::::W  E:::::E       EEEEEE  R::::R     R:::::R
 *   P::::P     P:::::PO:::::O     O:::::OW::::::W    W:::::W    W::::::W  E:::::E               R::::R     R:::::R
 *   P::::PPPPPP:::::P O:::::O     O:::::OW::::::W   W:::::::W   W::::::W  E::::::EEEEEEEEEE     R::::RRRRRR:::::R
 *   P:::::::::::::PP  O:::::O     O:::::OW::::::W  W::::W::::W  W::::::W  E:::::::::::::::E     R:::::::::::::RR
 *   P::::PPPPPPPPP    O:::::O     O:::::OW::::::W W::::W W::::W W::::::W  E:::::::::::::::E     R::::RRRRRR:::::R
 *   P::::P            O:::::O     O:::::OW:::::::W::::W   W::::W:::::::W  E::::::EEEEEEEEEE     R::::R     R:::::R
 *   P::::P            O:::::O     O:::::OW:::::::::::W     W:::::::::::W  E:::::E               R::::R     R:::::R
 *   P::::P            O::::::O   O::::::OW::::::::::W       W::::::::::W  E:::::E       EEEEEE  R::::R     R:::::R
 * PP::::::PP          O:::::::OOO:::::::OW:::::::::W         W:::::::::WEE::::::EEEEEEEE:::::ERR:::::R     R:::::R
 * P::::::::P           OO:::::::::::::OO W::::::::W           W::::::::WE::::::::::::::::::::ER::::::R     R:::::R
 * P::::::::P             OO:::::::::OO   W:::::::W             W:::::::WE::::::::::::::::::::ER::::::R     R:::::R
 * PPPPPPPPPP               OOOOOOOOO     WWWWWWWW               WWWWWWWWEEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR
 *
======================================================================================================================
======================================================================================================================
"""

# global variables
path = os.path.abspath('pdfs') + '/'
# j = json.loads(sys.argv[1])
# fileName = j['fileName']
# paper = fileName
paper = sys.argv[1]
# path = '/usr/app/public/temp/'

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')  # pos_tag dependency
nltk.download('maxent_ne_chunker')  # ne_chunk dependency
nltk.download('words')  # ne_chunk dependency

# papers = ['Choietal_GCA_1995.pdf', 'Kracheretal_GCA_1980.pdf', 'Litasov2018_Article_TraceElementCompositionAndClas.pdf',
# 			'Malvinetal_GCA_1984.pdf', 'Ruzicka2014.pdf', 'RuzickaandHutson2010.pdf', 
# 			'ScottandWasson_GCA_1976.pdf', 'Wasson_2004.pdf', 'Wasson_2010.pdf', 
# 			'Wasson_GCA_2017.pdf', 'Wasson_Icarus_1970.pdf', 'WassonandChoe_GCA_2009.pdf', 
# 			'WassonandChoi_2003.pdf', 'WassonandKallemeyn_GCA_2002.pdf', 'WassonandKimberlin_GCA_1967.pdf', 
# 			'WassonandOuyang 1990.pdf', 'WassonandRichardson_GCA_2011.pdf', 'WassonandRubinandHassanzadeh_1990.pdf', 
# 			'WassonandSchaudy_Icarus_1971.pdf', 'Wassonetal_GCA_2007.pdf']
# for paper in papers:
# 	print()
# 	print(paper + " TITLE: " + title_extract(paper) + '\n')
# 	print(paper + " AUTHOR(S): " + authors_extract(paper) + '\n')
# 	print(paper + " JOURNAL: " + journal_extract(paper) + '\n')
# 	print(paper + " VOLUME: " + volume_extract(paper) + '\n')
# 	print(paper + " ISSUE: " + issue_extract(paper) + '\n')
# 	print(paper + " DATE: " + date_extract(paper) + '\n')

attributes = {'title': title_extract(paper, path), 'authors': authors_extract(paper, path),
              'journal_name': journal_extract(paper, path), 'volume': volume_extract(paper, path),
              'issue': issue_extract(paper, path), 'date': date_extract(paper, path)}
attributes_json = json.dumps(attributes)
print(attributes_json)
