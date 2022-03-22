import csv
import json

csv_path = "C:\\Users\\User\\Desktop\\final_dataset1.csv"
json_path = "userData.json"

data = {}
i = 0
with open(csv_path) as csvF:
    csvReader = csv.DictReader(csvF)
    for rows in csvReader:
        data[i] = rows
        i += 1

jsonF = open("userData.json", 'w')

jsonF.write(json.dumps(data, indent=4))
