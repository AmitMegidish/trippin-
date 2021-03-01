CREATE DATABASE 3rd_project;
USE 3rd_project;

CREATE TABLE users(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(255) DEFAULT "user",
    PRIMARY KEY(id)
);

CREATE TABLE vacations(
    id INT AUTO_INCREMENT,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    vacation_description VARCHAR(255) NOT NULL,
    departure_date VARCHAR(255) NOT NULL,
    return_date VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    number_of_followers INT DEFAULT 0,
    image TEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE follow_up(
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL, 
    vacation_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id), 
    FOREIGN KEY(vacation_id) REFERENCES vacations(id),
    PRIMARY KEY(id)
);

INSERT INTO users (first_name,last_name,username,password, role)
VALUES
('admin', 'admin', 'admin', '$2b$10$DZAL7MzB/JG/QtVqZazGueGbcr6AuowA/MIsjG0WXFH7JYSptPPCe', 'admin'),
('user','user','user','$2b$10$DZAL7MzB/JG/QtVqZazGueGbcr6AuowA/MIsjG0WXFH7JYSptPPCe','user'),
('user1','user1','user1','$2b$10$DZAL7MzB/JG/QtVqZazGueGbcr6AuowA/MIsjG0WXFH7JYSptPPCe','user')
;

INSERT INTO VACATIONS (city, country,vacation_description, departure_date, return_date, price, image)
VALUES
("Jerusalem", "Israel", "Explore the holiest city in the entire world. Weather is great too.", "2020-12-06", "2020-12-13", 2500,'https://doc-research.org/wp-content/uploads/2018/05/jerusalem-1820x1024.jpg'),
("Amsterdam", "the Netherlands", "Here in Amsterdam, you can be who ever you would like to be. EVERYTHING is allowed.","2020-12-01", "2020-12-05", 1750,'https://www.telegraph.co.uk/content/dam/insurance/2016/04/06/amsterdam.jpg'),
("Paris", "France", "The Most romantic place on earth. Freshly baked baguettes are just A bonus!", "2020-12-24", "2020-12-30", 2200,'https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/paris-cityscape-overview-guide.jpg'),
("Tokyo", "Japan", "Experience a culture like no other. Plus, where else can you grab an authentic wagyu steak?", "2021-02-05", "2021-01-23", 2950,'https://i.insider.com/5d26280921a86107bb51bd92?width=1067&format=jpeg'),
("Madrid", "Spain", "A City that is truely one of a kind. Hala Madrid!", "2020-12-04","2020-12-12",1600,"https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Spain/Madrid/gran-via-madrid-night-lead-guide.jpg"),
("New York", "USA", "The Big apple sure is sweet from here. Enjoy the city that NEVER sleeps.", "2020-11-23", "2020-12-05",3800,"https://kaufman.usc.edu/files/2019/08/NYC.jpg"),
("London", "UK", "One of the most iconic cities in the whole world, at the best price you'll get!", "2020-12-03","2020-12-10",9500,"https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1555943130/production/city/hero_image_11_1555943130.jpg"),
("Naples", "Italy","Just look at the photo. No description is needed","2020-11-30","2020-12-03",1400,"https://bigseventravel.com/wp-content/uploads/2019/07/Screenshot-2019-07-13-at-18.23.06.png")
;

