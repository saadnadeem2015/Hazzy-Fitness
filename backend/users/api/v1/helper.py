import requests
from requests_toolbelt.multipart.encoder import MultipartEncoder
from bs4 import BeautifulSoup
from datetime import date


def calculate_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age


def calculate_user_numbers(age, gender, weight, weight_u, height, height_u, activ, target):
    url = "https://www.mdapp.co/apps/macronutricalc_ajax.php"
    data_dict = {
                'age': str(age),
                'gender': str(gender),
                'weight': str(weight),
                'weight_u': str(weight_u),
                'height': str(height),
                'height_u': str(height_u),
                'activ': str(activ),
                'macronut': "Low Carb/High Protein Diet (50: 20: 30)",
                'target': str(target),
                #'caldeficit': "2",
                'rel': "https://www.mdapp.co/macro-nutrient-calculator-533/",
                'app_name': "Macro (Nutrient) Calculator",
                'field_names': "Age|Gender|Weight|Height|Height (inches field)|Activity level (factor)|Macronutrient (protein: carbs: fat)|Protein intake in diet (%)|Carbohydrate intake in diet (%)|Fat intake in diet (%)|Target|Calorie deficit (%)|Calorie excess (%)",
                'submit': "Calculate",
            }
    if "deficit" in target:
        data_dict['caldeficit'] = '2'
    elif "excess" in target:
        data_dict['calexcess'] = '2'
    m = MultipartEncoder(
    fields=data_dict
    )

    r = requests.post(url, data=m, headers={'Content-Type': m.content_type})

    soup = BeautifulSoup(r.content, 'html.parser')
    my_numbers = soup.find_all("td", {"class": "t2-half"})
    calories = my_numbers[0].text.split('kcal')[0].strip()
    protien = my_numbers[1].text.split('grams')[0].strip()
    carbohydrates = my_numbers[2].text.split('grams')[0].strip()
    fats = my_numbers[3].text.split('grams')[0].strip()

    return [calories, protien, carbohydrates, fats]
