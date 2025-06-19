CREATE DATABASE ucu_hostels;
USE ucu_hostels;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
CREATE TABLE hostels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  price_per_month INT NOT NULL,
  distance_km FLOAT NOT NULL,
  amenities TEXT,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO hostels (user_id, name, address, price_per_month, distance_km, amenities, latitude, longitude)
VALUES
  (NULL, 'Sunset Hostel', 'Mukono Town, Kauga Road', 150000, 1.0, 'Wi-Fi,Water,Security', 0.3190, 32.7405),
  (NULL, 'UCU View Lodge', 'Near UCU Main Gate', 200000, 0.5, 'Wi-Fi,Furnished', 0.3180, 32.7390),
  (NULL, 'Green Hill Hostel', 'Mukono Hills', 120000, 1.5, 'Water,Parking', 0.3200, 32.7410),
  (NULL, 'Starlight Dorm', 'Seeta Road, Mukono', 180000, 2.0, 'Wi-Fi,Security', 0.3210, 32.7420),
  (NULL, 'Peace Haven', 'Mukono Central', 160000, 1.2, 'Water,Furnished', 0.3195, 32.7400); 

Select * from hostels;

ALTER TABLE users ADD COLUMN role ENUM('student', 'landlord', 'admin') NOT NULL DEFAULT 'student' ;
SELECT * FROM users;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  hostel_id INT NOT NULL,
  content TEXT NOT NULL,
  sent_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE
);

Desc messages;

ALTER TABLE users
ADD COLUMN username VARCHAR(50) NOT NULL,
ADD COLUMN contact VARCHAR(20) NOT NULL;
desc users;

RENAME TABLE hostels TO Hostels;
ALTER TABLE Hostels
ADD COLUMN address_location VARCHAR(255) NOT NULL,
ADD COLUMN contact VARCHAR(20) NOT NULL;
desc hostels;

CREATE TABLE Image(
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    image_format VARCHAR(50) NOT NULL
);
show tables;

CREATE TABLE Booking (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  hostel_id INT,
  contact VARCHAR(20) NOT NULL,
  email_address VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (hostel_id) REFERENCES Hostels(id) ON DELETE CASCADE
);

CREATE TABLE RoomCategory (
  room_id INT AUTO_INCREMENT PRIMARY KEY,
  hostel_id INT,
  room_type ENUM('single', 'double') NOT NULL,
  FOREIGN KEY (hostel_id) REFERENCES Hostels(id) ON DELETE CASCADE
);

CREATE TABLE Review (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  hostel_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (hostel_id) REFERENCES Hostels(id) ON DELETE CASCADE
);

CREATE TABLE Notification (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

show tables;