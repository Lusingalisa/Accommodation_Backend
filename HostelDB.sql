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