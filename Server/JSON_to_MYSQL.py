import json
import mysql.connector

# Connect to your MySQL database
cnx = mysql.connector.connect(user='test2', password='password', host='172.10.7.52', database='login')
cursor = cnx.cursor()
# Path to your JSONL file
jsonl_file_path = 'C:\\Users\\cbg71\\Documents\\Devices\\articles.jsonl'

# Read the JSONL file and insert each line into the MySQL table
with open(jsonl_file_path, 'r') as file:
    for line in file:
        data = json.loads(line)
        # Convert tags list to string
        tags_str = ', '.join(data['tags'])
        # Prepare the insert statement
        insert_stmt = (
            "INSERT INTO articles (uid, article_url, title_text, body_text, thumbnail, article_date, site_info, like_count, viewed_count, tags) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        )
        data_tuple = (data['uid'], data['article_url'], data['title_text'], data['body_text'], data['thumbnail'], data['article_date'], data['site_info'], data['like_count'], data['viewed_count'], tags_str)
        # Execute the query
        cursor.execute(insert_stmt, data_tuple)

# Commit the changes and close the connection
cnx.commit()
cursor.close()
cnx.close()
