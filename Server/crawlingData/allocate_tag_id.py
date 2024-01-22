import mysql.connector

# Connect to your MySQL database
cnx = mysql.connector.connect(user='test2', password='password', host='172.10.7.52', port=80, database='login')
cursor = cnx.cursor()

# Retrieve data
select_query = "SELECT DISTINCT tag FROM article_tags"
cursor.execute(select_query)
tags = cursor.fetchall()

# Extract unique tags and assign IDs
unique_tags = set()
for (tag,) in tags:
    words = tag.split()  # Assuming tags are separated by spaces
    unique_tags.update(words)

# Create new table for unique tags with IDs
cursor.execute("DROP TABLE IF EXISTS unique_tags")
cursor.execute("CREATE TABLE unique_tags (id INT AUTO_INCREMENT PRIMARY KEY, tag VARCHAR(255) UNIQUE)")

# Insert unique tags into new table
for tag in unique_tags:
    try:
        insert_query = "INSERT INTO unique_tags (tag) VALUES (%s)"
        cursor.execute(insert_query, (tag,))
    except mysql.connector.Error as err:
        print(f"Error: {err}")

# Step 1: Add a new column for the count
cursor.execute("ALTER TABLE unique_tags ADD COLUMN tag_count INT DEFAULT 0")

# Step 2 & 3: Calculate and update the tag counts
update_query = """
UPDATE unique_tags 
SET tag_count = (SELECT COUNT(*) 
                 FROM article_tags 
                 WHERE article_tags.tag = unique_tags.tag)
"""
cursor.execute(update_query)

# Commit changes
cnx.commit()

# Close the connection
cursor.close()
cnx.close()
