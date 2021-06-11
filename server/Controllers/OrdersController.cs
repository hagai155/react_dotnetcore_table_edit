using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using server.Services;


namespace server.Controllers
{
    [ApiController]

    public class OrdersController : ControllerBase
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly IConfiguration _config;
        private IOrdersService _ordersService;

        public OrdersController(ILogger<OrdersController> logger, IConfiguration configuration, IOrdersService ordersService)
        {
            _logger = logger;
            _config = configuration;
            _ordersService = ordersService;
        }

        [HttpGet("api/[controller]/GetAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                var lst_Orders = await _ordersService.GetAllOrders();
                return Ok(lst_Orders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
