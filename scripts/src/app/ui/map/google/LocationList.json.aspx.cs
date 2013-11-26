using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Terabyte.UmbracoWebsite.Library.TnzFeed;
using Terabyte.Web.Extensions;

namespace Terabyte.UmbracoWebsite.js
{
	public class MapableLocation
	{
		public MapableLocation()
		{
			Categories = new List<int>();
			MarkerCategory = -1;
		}
		public string Id { get; set; }
		public string Latitude { get; set; }
		public string Longitude { get; set; }
		public List<int> Categories { get; set; }
		public int MarkerCategory { get; set; }
	}

	public class MapableCategory
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public bool ShowOnMapCategoryPicker { get; set; }
		public bool ShowCustomMarker { get; set; }
		public string CssClass { get; set; }
		public int Level { get; set; }
	}

	public partial class LocationList : System.Web.UI.Page
	{
		protected List<MapableCategory> AllCategories;
		private ListingProxy Proxy = new ListingProxy();

		protected void Page_Load(object sender, EventArgs e)
		{
			//Response.ContentType = "application/json";
			AllCategories = new List<MapableCategory>(findCategories(Proxy.All));
			LocationCategories.DataSource = AllCategories;
			LocationCategories.DataBind();

			Locations.DataSource = findLocations();
			Locations.DataBind();
		}

		protected IEnumerable<MapableCategory> findCategories(IEnumerable<TnzListing> allItems )
		{
			var shownCategories = new[] { "Accommodation", "Activities and Tours", "Transport", "Visitor Information Centre" };
			foreach (string typeName in allItems.Select(a => a.business_type).Distinct().OrderBy(a => a))
			{
				var cat = new MapableCategory();
				cat.Id = typeName.ToCssClassName();
				cat.Name = typeName;
				cat.ShowOnMapCategoryPicker = shownCategories.Contains(typeName);
				cat.ShowCustomMarker = true;
				cat.CssClass = typeName.ToCssClassName();
				cat.Level = 1;
				yield return cat;
			}
		}

		//todo: find a better way to find all the mapable locations.
		protected IEnumerable<MapableLocation> findLocations()
		{
			foreach (var item in Proxy.All)
			{
				if (//item.HasValues(new string[] { "DetailCategories", "Location" })
					item.latitude.Length+item.longitude.Length > 4
					&&	item.listing_types.Length>0)
				{

					var location = new MapableLocation();
					location.Id = item.listing_name_key;
					location.Latitude = item.latitude;
					location.Longitude = item.longitude;
					// clean up messy imported coordinates.
					location.Latitude = location.Latitude.Replace("&#176;", "."); // change ° to .
					location.Longitude = location.Longitude.Replace("&#176;", "."); // change ° to .
					location.Latitude = Regex.Replace(location.Latitude, @"[^\-\.\d]", ""); // remove any invalid characters
					location.Longitude = Regex.Replace(location.Longitude, @"[^\-\.\d]", ""); // remove any invalid characters

					for (int i = 0; i < AllCategories.Count; i++)
					{
						if (item.business_type == AllCategories[i].Name)
						{
							location.Categories.Add(i);
							location.MarkerCategory = i;
						}
					}

					if (location.Categories.Count > 0 && !string.IsNullOrEmpty(location.Latitude) && !string.IsNullOrEmpty(location.Longitude))
						yield return location;
				}
			}
		}
	}
}