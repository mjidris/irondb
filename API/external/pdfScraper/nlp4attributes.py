#!/usr/bin/env python3

"""
nlp4metadata.py: Extracts paper attributes from the text of a pdf using NLP.
Attributes include: title, authors, source (journal, volume, issue), and publishing date.
neeed sample usage
talk about the different forms of using the script, uses, purposes, under development warning
"""
__authors__ = "Hajar Boughoula, Mohamed Idris"
__version__ = "2.3"
__email__ = "hajar.boughoula@gmail.com, m4idris@gmail.com"
__date__ = "02/06/19"

import json
import sys
from enum import Enum

import nltk

from attribute_extractor import authors_extract
from attribute_extractor import date_extract
from attribute_extractor import issue_extract
from attribute_extractor import journal_extract
from attribute_extractor import title_extract
from attribute_extractor import volume_extract

TEST_PAPERS = [
    'Choietal_GCA_1995.pdf',
    'Kracheretal_GCA_1980.pdf',
    'Litasov2018_Article_TraceElementCompositionAndClas.pdf',
    'Malvinetal_GCA_1984.pdf', 'Ruzicka2014.pdf',
    'RuzickaandHutson2010.pdf',
    'ScottandWasson_GCA_1976.pdf',
    'Wasson_2004.pdf',
    'Wasson_2010.pdf',
    'Wasson_GCA_2017.pdf',
    'Wasson_Icarus_1970.pdf',
    'WassonandChoe_GCA_2009.pdf',
    'WassonandChoi_2003.pdf',
    'WassonandKallemeyn_GCA_2002.pdf',
    'WassonandKimberlin_GCA_1967.pdf',
    'WassonandOuyang 1990.pdf',
    'WassonandRichardson_GCA_2011.pdf',
    'WassonandRubinandHassanzadeh_1990.pdf',
    'WassonandSchaudy_Icarus_1971.pdf',
    'Wassonetal_GCA_2007.pdf'
]


class Mode(Enum):
    API = 1
    SINGLE_PAPER = 2
    TEST_PAPERS = 3


def process_launch_args():
    # Filter out the first argument which is always the filename.
    launch_args = sys.argv[1:]

    if len(launch_args) == 0:
        print('No launch args received. Processing in TEST_PAPERS mode.\n')
        return Mode.TEST_PAPERS, None

    # We have at least one launch arg. We will only process the first one.
    # We first attempt to process it as a json object. If it is not a json
    # object, we then process it as a research paper name.
    arg = launch_args[0]
    try:
        # Our backend API runs this script with a json object in the following form:
        # { "fileName": "paperName" }
        #
        # We'll use the json module to process the arg, then access the value at the
        # "fileName" property.

        js = json.loads(arg)
        if js['fileName'] is not None:
            return Mode.API, js['fileName']

    except json.decoder.JSONDecodeError:
        print(arg, 'is not a json object. Processing in SINGLE_PAPER mode.\n')
        return Mode.SINGLE_PAPER, arg


def print_attributes(print_mode, research_paper):
    attributes = {
        'title': title_extract(research_paper),
        'authors': authors_extract(research_paper),
        'journal_name': journal_extract(research_paper),
        'volume': volume_extract(research_paper),
        'issue': issue_extract(research_paper),
        'date': date_extract(research_paper)
    }

    if print_mode == Mode.API:
        print(json.dumps(attributes))

    else:
        print('Attributes for ' + research_paper)
        for attribute, value in attributes.items():
            print(attribute.upper() + ':', value)
        print()


# Start of nlp4attributes script.
# Begin by downloading necessary NLTK dependencies.
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')  # pos_tag dependency
nltk.download('maxent_ne_chunker')  # ne_chunk dependency
nltk.download('words')  # ne_chunk dependency

# Next process launch arguments to determine which mode we are in
# and which paper(s) to process.
mode, paper = process_launch_args()

# Finally, print process paper(s) and print them out.
if mode == Mode.TEST_PAPERS:
    # In the TEST_PAPERS mode, we just cycle through all the test papers
    # and print out their values.
    for test_paper in TEST_PAPERS:
        print_attributes(mode, test_paper)

else:
    # For all other modes, we only have a single paper to process.
    print_attributes(mode, paper)

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
