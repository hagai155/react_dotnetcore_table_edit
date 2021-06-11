using System;

namespace server
{
    public class Orders
    {
        public int OrderID { get; set; }
        public string CompanyName { get; set; }
        public decimal Freight { get; set; }
        public string ShipAddress { get; set; }
        public string ShipCity { get; set; }
        public string ShipRegion { get; set; }

    }
}
