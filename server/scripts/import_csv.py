import csv
import pymongo
import os
import dotenv


dotenv.load_dotenv()
mongo_pass = os.getenv('MONGOPASS')

print(mongo_pass)

# Connect to MongoDB
client = pymongo.MongoClient(f'mongodb+srv://shellhacks:{mongo_pass}@esg.hiumhxt.mongodb.net/?retryWrites=true&w=majority')

# Select database

db = client['ESG']

print(db)
# Select collection
for x in db.list_collection_names():
    print(x)
    print('\n\n\n')

collection = db['companies']

print('collection is ' + str(collection))

print(collection.find_one({'name': 'Apple'}))


# Open CSV

# with open('server/scripts/ESG.csv', 'r') as csvfile:
# upsert records into companies by SYMBOL