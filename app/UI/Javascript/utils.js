function blurBg(px)
{
    document.getElementById("mainContainer").style.filter = "blur("+px+"px)";
    if(px == 0)
    {
        document.getElementById("loadingGif").style.display =  "none";
    }
    else
    {
        document.getElementById("loadingGif").style.display =  "initial";
    }
}
    