function openUserDataPopup()
{
    blurBg(8);
    document.getElementById('insert-editDataPopup').style.display = "flex";
    document.getElementById('fullPageovelay').style.display = "initial";
}
function closeUserDataPopup(){
    document.getElementById('insert-editDataPopup').style.display = "none";
    document.getElementById('fullPageovelay').style.display = "none";
    blurBg(0);
}