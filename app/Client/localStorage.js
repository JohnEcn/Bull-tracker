function fetchUserData()
{
    let data = localStorage.getItem("coinData");
    if(data == null){data = "[]";}
    return data;
}
function setUserData(data)
{
    return localStorage.setItem("coinData",data);
}
function fetchDataParameters()
{
    let data = localStorage.getItem("dataParameters");
    if(data == null){data = "[]";}
    return data;
}
function setDataParameters(data)
{
    return localStorage.setItem("dataParameters",data);
}