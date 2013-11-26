<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LocationList.json.aspx.cs" Inherits="Terabyte.UmbracoWebsite.js.LocationList" %>
{
<asp:Repeater runat="server" ID="LocationCategories">
<HeaderTemplate>
"categories":[
</HeaderTemplate>
<ItemTemplate>
{
'id':'<%# Eval("Id") %>', 
'name':'<%# Eval("Name") %>', 
'cssClass': '<%# Eval("CssClass")%>',
'showCategory':<%# Eval("ShowOnMapCategoryPicker").ToString().ToLower() %>, 
'showCustomMarker':<%# Eval("ShowCustomMarker").ToString().ToLower()  %>, 
'level': <%# Eval("Level") %>
}
</ItemTemplate>
<SeparatorTemplate>,</SeparatorTemplate>
<FooterTemplate>
]
</FooterTemplate>
</asp:Repeater>,<asp:Repeater runat="server" ID="Locations">
<HeaderTemplate>
"locations":[
</HeaderTemplate>
<ItemTemplate>
{
'id':'<%# Eval("Id") %>', 
'lat':<%# Eval("Latitude") %>, 
'lng':<%# Eval("Longitude") %>, 
'categories':[<%# string.Join(",",(List<int>)Eval("Categories")) %>],
'markerCategory': <%# Eval("MarkerCategory") %>
}
</ItemTemplate>
<SeparatorTemplate>,</SeparatorTemplate>
<FooterTemplate>
]
</FooterTemplate>
</asp:Repeater>
}
