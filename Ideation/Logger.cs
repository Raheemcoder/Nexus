﻿using log4net;
using System.Reflection;
using System.Xml;

namespace Ideation
{
    public class Logger
    {
        private static readonly string LOG_CONFIG_FILE = @"log4net.config";

        private static readonly log4net.ILog _log = GetLogger(typeof(Logger));

        public static ILog GetLogger(Type type)
        {
            return LogManager.GetLogger(type);
        }

        public static void Debug(object message)
        {
            SetLog4NetConfiguration();
            _log.Debug(message);
        }

        private static void SetLog4NetConfiguration()
        {
            XmlDocument log4netConfig = new XmlDocument();
            log4netConfig.Load(File.OpenRead(LOG_CONFIG_FILE));

            var repo = LogManager.CreateRepository(
                Assembly.GetEntryAssembly(), typeof(log4net.Repository.Hierarchy.Hierarchy));

            log4net.Config.XmlConfigurator.Configure(repo, log4netConfig["log4net"]);
        }

        public void LogError(string From, string action, string ex)
        {
            log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            logger.Error(new { From = From, Method = action, Exception = ex });
        }
    }
}
