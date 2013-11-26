<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Availability.json.aspx.cs" Inherits="Terabyte.UmbracoWebsite.scripts.availability.Availability_json" %>
<%@ Register TagPrefix="cct" TagName="Search" Src="/usercontrols/Booking/AccommodationSearchResultsPane.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <cct:Search runat="server" />
    </div>
    </form>
</body>
</html>


