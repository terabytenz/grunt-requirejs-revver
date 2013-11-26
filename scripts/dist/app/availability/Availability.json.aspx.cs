using System;
using System.Text;
using System.Web.Services;
using Terabyte.UmbracoWebsite.Library.TnzFeed;
using Terabyte.UmbracoWebsite.usercontrols.Booking;
using umbraco.NodeFactory;

namespace Terabyte.UmbracoWebsite.scripts.availability
{
	public partial class Availability_json : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
		}

		[WebMethod]
		public static string GetAvailabilityHtml(int nodeID, DateTime DateIn, DateTime DateOut)
		{
			if (DateIn == DateTime.MinValue)
			{
				DateIn = DateTime.Now;
			}
			if (DateOut == DateTime.MinValue)
			{
				DateOut = DateIn.AddDays(BookingAvailabilityGrid.DAYS_TO_SHOW);
			}

			string url;
			var avail = BookingAvailabilityGrid.GetAvailability(new Node(nodeID), DateIn, DateOut, out url);
			StringBuilder sb = new StringBuilder();
			if (avail == null)
			{
				sb.AppendFormat("<td colspan=" + BookingAvailabilityGrid.DAYS_TO_SHOW + "><span class=\"availability-na\">No current availability</span</td>");
			}
			else
			{
				foreach (AvailabilityNight night in avail)
				{
					sb.AppendFormat(@"
	<td class=""{2:ddd} {4} availible-booking"">
		<span class=""availability-na"">{3}</span>
	</td>
						",
									night.AvailabilityType.ToString().ToLower(), night.BookingUrl, night.Date, night.Rate,
									night.Selected ? "selected" : "");
				}
			}
			return sb.ToString();
		}
	}
}
