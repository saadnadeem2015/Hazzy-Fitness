import requests
from requests_toolbelt.multipart.encoder import MultipartEncoder
from bs4 import BeautifulSoup
from datetime import date
import http.client


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


def calculate_user_numbers_updated(age, gender, weight, weight_u, height, height_u, activ, target):
    if "deficit" in target:
        caldeficit = '2'
    elif "excess" in target:
        caldeficit = '2'
    else:
        caldeficit = 2

    conn = http.client.HTTPSConnection("www.mdapp.co")

    if height_u == "in":
        try:
            split_height = str(height).split("'")
            if len(split_height) == 2:
                final_height = int(split_height[0]) * 12 + int(split_height[1])
            else:
                final_height = height
        except:
            final_height = height
    else:
        final_height = height

    payload = "age=" + str(age) + "&gender=" + str(gender) + "&weight=" + str(weight) + "&weight_u=" + str(
        weight_u) + "&height=" + str(final_height) + "&height_u=" + str(height_u) + "&activ=" + str(
        activ) + "&macronut=Low%20Carb%2FHigh%20Protein%20Diet%20(50%3A%2020%3A%2030)&target=" + str(
        target) + "&caldeficit=" + str(
        caldeficit) + "&rel=https%3A%2F%2Fwww.mdapp.co%2Fmacro-nutrient-calculator-533%2F&app_name=Macro%20(Nutrient)%20Calculator&field_names=Age%7CGender%7CWeight%7CHeight%7CHeight%20(inches%20field)%7CActivity%20level%20(factor)%7CMacronutrient%20(protein%3A%20carbs%3A%20fat)%7CProtein%20intake%20in%20diet%20(%25)%7CCarbohydrate%20intake%20in%20diet%20(%25)%7CFat%20intake%20in%20diet%20(%25)%7CTarget%7CCalorie%20deficit%20(%25)%7CCalorie%20excess%20(%25)&submit=Calculate"
    headers = {
        # 'cookie': "PHPSESSID=2bd4c4493c029c16a3cf9bc0441630dc",
        'Content-Type': "application/x-www-form-urlencoded"
    }

    conn.request("POST", "/apps/macronutricalc_ajax.php", payload, headers)
    res = conn.getresponse()
    data = res.read()

    soup = BeautifulSoup(data.decode("utf-8"), 'html.parser')
    my_numbers = soup.find_all("td", {"class": "t2-half"})
    calories = my_numbers[0].text.split('kcal')[0].strip()
    protien = my_numbers[1].text.split('grams')[0].strip()
    carbohydrates = my_numbers[2].text.split('grams')[0].strip()
    fats = my_numbers[3].text.split('grams')[0].strip()

    return [calories, protien, carbohydrates, fats]
