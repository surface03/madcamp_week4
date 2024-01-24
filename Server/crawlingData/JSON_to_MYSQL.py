import json
import mysql.connector

# Connect to your MySQL database
# cnx = mysql.connector.connect(user='test2', password='password', host='172.10.7.52', port=80, database='login')
cnx = mysql.connector.connect(user='root', password='0000', host='localhost', port=3306, database='login')
cursor = cnx.cursor()

# Path to your JSON file
json_file_path = 'merged_data.json'

# Read the JSON file and insert each entry into the MySQL tables
with open(json_file_path, 'r', encoding='utf-8') as file:
    data_array = json.load(file)
    for data in data_array:
        try:
            # Insert article data
            article_insert_stmt = (
                "INSERT INTO articles (uid, article_url, title_text, body_text, thumbnail, article_date, site_info, like_count, viewed_count, large_tag) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            )
            article_data_tuple = (
                data['uid'], data['article_url'], data['title_text'], data['body_text'], 
                data['thumbnail'], data['article_date'], data['site_info'], 
                data['like_count'], data['viewed_count'], data['tags2']
            )
            cursor.execute(article_insert_stmt, article_data_tuple)

            # Insert tags
            if data.get('tags'):
                for tag in data['tags']:
                    tag_insert_stmt = "INSERT INTO article_tags (article_uid, tag) VALUES (%s, %s)"
                    cursor.execute(tag_insert_stmt, (data['uid'], tag))

        except Exception as e:
            print(f"An error occurred: {e}")
            continue

# Commit the changes and close the connection
cnx.commit()
cursor.close()
cnx.close()
