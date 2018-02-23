<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Survey.aspx.cs" Inherits="Web_CargosAutomaticos.Survey" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style>
        .botonnumerico {
            width: 300px;
            height: 300px;
            font-size: 100px;
            float: left;
            color: white;
            background-color: black;
        }
    </style>
</head>
<body id="bodyform" runat="server">
    <form id="form1" runat="server">
    <div>
        <div class="row">
            <div class="col-sm-12">
                <asp:DropDownList ID="ddl_genero" runat="server" AutoPostBack="True" Font-Size="XX-Large" OnSelectedIndexChanged="ddl_genero_SelectedIndexChanged">
                    <asp:ListItem>seleccione</asp:ListItem>
                    <asp:ListItem>Hombre</asp:ListItem>
                    <asp:ListItem>Mujer</asp:ListItem>
                </asp:DropDownList>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <asp:Button ID="Button1" runat="server" Text="1" class="botonnumerico" OnClick="Button1_Click" />
            </div>
            <div class="col-sm-2">
                <asp:Button ID="Button2" runat="server" Text="2" class="botonnumerico" OnClick="Button2_Click" />
            </div>
            <div class="col-sm-2">
                <asp:Button ID="Button3" runat="server" Text="3" class="botonnumerico" OnClick="Button3_Click" />
            </div>
            <div class="col-sm-2">
                <asp:Button ID="Button4" runat="server" Text="4" class="botonnumerico" OnClick="Button4_Click" />
            </div>
            <div class="col-sm-2">
                <asp:Button ID="Button5" runat="server" Text="5" class="botonnumerico" OnClick="Button5_Click" />
            </div>
            <div class="col-sm-2">
                <asp:Button ID="Button6" runat="server" Text="6" class="botonnumerico" OnClick="Button6_Click" />
            </div>
            <div class="col-sm-2">
                <asp:Button ID="Button7" runat="server" Text="7" class="botonnumerico" OnClick="Button7_Click" />
            </div>
        </div>
    </div>
 </form>
</body>
</html>
