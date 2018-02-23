<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Resultado.aspx.cs" Inherits="Web_CargosAutomaticos.Resultado" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
     <div class="row">
            <div class="col-sm-12">
                <asp:Button ID="btn_actualizar" runat="server" Text="Actualizar" onclick="btn_actualizar_Click"/>
            </div>
        </div>
        <br />
            <div class="row">
            <div class="col-sm-6">
                <asp:Label ID="lbl_hombre" runat="server" Text="Label"></asp:Label>
            </div>
                <div class="col-sm-6">
                <asp:Label ID="lbl_mujer" runat="server" Text="Label"></asp:Label>
            </div>
        </div>
         <br />
         <div class="row">
            <div class="col-sm-12">
                <asp:Button ID="btnlimpiar" runat="server" Text="Limpiar"  OnClick="btnlimpiar_Click"/>
            </div>
        </div>
         <div class="row">
            <div class="col-sm-12">
               <asp:Label runat="server" id="lbl_error" Text=""></asp:Label>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
