-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 11, 2026 at 06:33 AM
-- Server version: 5.7.26
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskwala`
--

-- --------------------------------------------------------

--
-- Table structure for table `courier_inward`
--

DROP TABLE IF EXISTS `courier_inward`;
CREATE TABLE IF NOT EXISTS `courier_inward` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courier_number` int(100) NOT NULL,
  `from` varchar(500) DEFAULT NULL,
  `received_by` varchar(100) DEFAULT NULL,
  `status` enum('Received','Assigned','Delivered') DEFAULT 'Received',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courier_inward`
--

INSERT INTO `courier_inward` (`id`, `courier_number`, `from`, `received_by`, `status`, `date`) VALUES
(1, 741, 'jetpur', 'jignasa', 'Received', '2026-01-10 06:23:09'),
(2, 741, 'jetpur', 'jignasa', 'Received', '2026-01-10 06:48:32'),
(3, 741, 'jetpur', 'jignasa', 'Assigned', '2026-01-10 06:50:14');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `description` text,
  `priority` enum('High','Medium','Low') DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('Pending','In-Progress','Completed') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `assigned_to` (`assigned_to`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `priority`, `assigned_to`, `due_date`, `status`, `created_at`) VALUES
(1, 'System Testing', 'Perform unit and system testing and report any issues or improvements required.', 'High', 4, '2026-01-22', 'In-Progress', '2026-01-08 17:33:21'),
(4, 'Data Entry & Verification', 'Enter provided data into the system and verify accuracy by checking for missing or incorrect information.', 'Medium', 4, '2026-01-21', 'In-Progress', '2026-01-09 11:48:20'),
(5, 'Upload Project Files', 'Upload project-related documents and screenshots in the task update section.', 'Low', 4, '2026-01-20', 'In-Progress', '2026-01-09 18:22:18');

-- --------------------------------------------------------

--
-- Table structure for table `task_comments`
--

DROP TABLE IF EXISTS `task_comments`;
CREATE TABLE IF NOT EXISTS `task_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment` text,
  `task_file` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task_comments`
--

INSERT INTO `task_comments` (`id`, `task_id`, `user_id`, `comment`, `task_file`, `created_at`) VALUES
(1, 5, 4, 'dddddasd', '', '2026-01-10 17:49:32'),
(2, 5, 4, 'dddddasd', '', '2026-01-10 17:50:18'),
(3, 5, 4, 'dddddasd', '', '2026-01-10 17:50:49'),
(4, 5, 4, 'ddadad', '', '2026-01-10 17:51:19'),
(6, 4, 4, '', '', '2026-01-11 06:02:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','employee') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'jignasa', 'jignasa@gmail.com', '123', 'admin', '2026-01-06 08:41:45'),
(2, 'jignasa', 'hh@gmail.com', '123', 'admin', '2026-01-05 18:30:00'),
(4, 'payal', 'payal@gmail.com', '123', 'employee', '2026-01-08 17:04:49'),
(5, 'makwana jignasa', 'hhmakvana16@gmail.com', '123456', 'employee', '2026-01-10 06:55:51'),
(6, 'monali makwana', 'monali@gmail.com', '123456', 'admin', '2026-01-10 06:56:41');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
