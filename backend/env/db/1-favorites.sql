USE `dict`;

DROP TABLE IF EXISTS `favoriteWords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favoriteWords` (
  `userId` INT NOT NULL,
  `wordId` varchar(25) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;