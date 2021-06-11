using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace server.Services
{

    public interface IOrdersService
    {
        Task<IEnumerable<Orders>> GetAllOrders();
    }

    public class OrdersService : IOrdersService
    {
        private readonly IConfiguration _config;

        public OrdersService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<IEnumerable<Orders>> GetAllOrders()
        {
            try
            {
                var sql_query = "SELECT Orders.OrderID ,Customers.CompanyName ,Orders.Freight ,Orders.ShipAddress ,Orders.ShipCity ,Orders.ShipRegion FROM Orders left join Customers on Orders.CustomerID = Customers.CustomerID";

                using (var connection = new SqlConnection(_config.GetValue<string>("db_con_string")))
                {
                    var lst_orders = (await connection.QueryAsync<Orders>(sql_query)).ToList();

                    return lst_orders;
                }
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}
