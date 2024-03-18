# can remove later
import json
with open('message_1.json') as json_file:
    data = json.load(json_file)


import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import pickle


def clean_text(text):
    chat_words = {
        "AFAIK": "As Far As I Know",
        "AFK": "Away From Keyboard",
        "ASAP": "As Soon As Possible",
        "ATK": "At The Keyboard",
        "ATM": "At The Moment",
        "A3": "Anytime Anywhere Anyplace",
        "BAK": "Back At Keyboard",
        "BBL": "Be Back Later",
        "BBS": "Be Back Soon",
        "BFN": "Bye For Now",
        "B4N": "Bye For Now",
        "BRB": "Be Right Back",
        "BRT": "Be Right There",
        "BTW": "By The Way",
        "B4": "Before",
        "B4N": "Bye For Now",
        "CU": "See You",
        "CUL8R": "See You Later",
        "CYA": "See You",
        "FAQ": "Frequently Asked Questions",
        "FC": "Fingers Crossed",
        "FWIW": "For What It's Worth",
        "FYI": "For Your Information",
        "GAL": "Get A Life",
        "GG": "Good Game",
        "GN": "Good Night",
        "GMTA": "Great Minds Think Alike",
        "GR8": "Great",
        "G9": "Genius",
        "IC": "I See",
        "ICQ": "I Seek you",
        "ILU": "I Love You",
        "IMHO": "In My Honest/Humble Opinion",
        "IMO": "In My Opinion",
        "IOW": "In Other Words",
        "IRL": "In Real Life",
        "LDR": "Long Distance Relationship",
        "LMAO": "Laugh My Ass Off",
        "LOL": "Laughing Out Loud",
        "LTNS": "Long Time No See",
        "L8R": "Later",
        "MTE": "My Thoughts Exactly",
        "M8": "Mate",
        "NRN": "No Reply Necessary",
        "OIC": "Oh I See",
        "PITA": "Pain In The Ass",
        "PRT": "Party",
        "PRW": "Parents Are Watching",
        "ROFL": "Rolling On The Floor Laughing",
        "ROFLOL": "Rolling On The Floor Laughing Out Loud",
        "ROTFLMAO": "Rolling On The Floor Laughing My Ass Off",
        "SK8": "Skate",
        "STATS": "Your sex and age",
        "ASL": "Age Sex Location",
        "THX": "Thank You",
        "TTYL": "Talk To You Later",
        "U": "You",
        "U2": "You Too",
        "U4E": "Yours For Ever",
        "WB": "Welcome Back",
        "WTF": "What The Fuck",
        "WTG": "Way To Go",
        "WUF": "Where Are You From",
        "W8": "Wait",
        "7K": "Sick Laugher",
        "TFW": "That feeling when",
        "MFW": "My face when",
        "MRW": "My reaction when",
        "IFYP": "I feel your pain",
        "TNTL": "Trying not to laugh",
        "JK": "Just kidding",
        "IDC": "I dont care",
        "ILY": "I love you",
        "IMU": "I miss you",
        "ADIH": "Another day in hell",
        "ZZZ": "Sleeping bored tired",
        "WYWH": "Wish you were here",
        "TIME": "Tears in my eyes",
        "BAE": "Before anyone else",
        "FIMH": "Forever in my heart",
        "BSAAW": "Big smile and a wink",
        "BWL": "Bursting with laughter",
        "BFF": "Best friends forever",
        "CSL": "Cant stop laughing"
    }
    text = re.sub(r"[!@#$(),\n%^*?.'\:;~`0-9]", '', str(text))
    text = text.split(" ")
    for i, word in enumerate(text):
        if word.upper() in chat_words:
            text[i] = chat_words[word.upper()]

    text = " ".join(word for word in text).lower()

    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text, language='english', preserve_line=True)
    text = " ".join(word for word in word_tokens if not word.lower() in stop_words)
    return text


def prediction(text, model, cv):
    print(text)
    text = clean_text(text)
    X = cv.transform([text]).toarray()
    return model.predict_proba(X)[0]


def get_data(data, user, positivity_model, emotion_model, positivity_cv, emotion_cv):
    # key: timestamp in ms
    # returns list containing [positivity score, negativity_score, sadness, joy, love, anger, fear, and surprise]
    sentiment_dict = {}
    messages = data["messages"]
    for message in messages:
        if message["sender_name"] == user:
            positivity = prediction(message["content"], positivity_model, positivity_cv)
            emotion = prediction(message["content"], emotion_model, emotion_cv)
            time = message["timestamp_ms"]
            sentiment_dict[time] = list(positivity) + list(emotion)
    
    return sentiment_dict


file = open('models/positivity_model.pickle', 'rb')
positivity_model = pickle.load(file)

file = open('models/positivity_cv.pickle', 'rb')
positivity_cv = pickle.load(file)

file = open('models/emotion_model.pickle', 'rb')
emotion_model = pickle.load(file)

file = open('models/emotion_cv.pickle', 'rb')
emotion_cv = pickle.load(file)


print(get_data(data, "Edison Ying", positivity_model, emotion_model, positivity_cv, emotion_cv))
