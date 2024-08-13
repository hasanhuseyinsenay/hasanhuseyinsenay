// ? Tüm elementleri seçmek.
const form = document.querySelector(".card-body").children[0]; // class
const girisEkle = document.querySelector("#todoName"); // id
const yapilacaklarListesi = document.querySelector(".list-group"); // class
const ilkKartGovdesi = document.querySelectorAll(".card-body")[0]; // class
const ikinciKartGovdesi = document.querySelectorAll(".card-body")[1]; // class
const temzileDugmesi = document.querySelector("#clearButton"); // id
const filtreGirisi = document.querySelector("#todoSearch"); // id

let yapilacaklar = [];
let bekleme = 2500;
olaylariCalistir();

function olaylariCalistir(){
    form.addEventListener("submit", yapilacakEkle); // submit --> type attiribute'u
    document.addEventListener("DOMContentLoaded", sayfaYuklendiginde); // ! document önemli!!!
    ikinciKartGovdesi.addEventListener("click", arayuzdenYapilacagiKaldir);
    temzileDugmesi.addEventListener("click", tumYapilacaklariTemizle)
    filtreGirisi.addEventListener("keyup", filtrele);
}
function filtrele(e){
    const filtreDegeri = e.target.value.toLowerCase();
    const filtrelenecekYapilacaklar = document.querySelectorAll(".list-group-item");
    
    if(filtrelenecekYapilacaklar.length > 0){
        filtrelenecekYapilacaklar.forEach(function(yapilacak){
            if(yapilacak.textContent.toLowerCase().trim().includes(filtreDegeri)){
                //
                yapilacak.setAttribute("style", "display: block"); // * Ekranda Görünür.
            }
            else{
                yapilacak.setAttribute("style", "display: none !important"); // * Ekranda GÖRÜNMEZ.
            }
        })
    }
    else{
        uyariGoster("danger", "Filtreleme Yapmak İçin Halihazırda Kaydedilmiş Bir Yapılacak Bulunmamaktadır.");
    }
}
function tumYapilacaklariTemizle(){
    const kaydedilenYapilacaklar = document.querySelectorAll(".list-group-item");
    if(kaydedilenYapilacaklar.length > 0){
        console.log(kaydedilenYapilacaklar);
        kaydedilenYapilacaklar.forEach(function(yapilacak){
            yapilacak.remove();
        });
        yapilacaklar = [];
        localStorage.setItem("yapilacaklar", JSON.stringify(yapilacaklar));
        uyariGoster("primary", "Tüm Yapılacaklar Başarılı Bir Şekilde Temzilenmiştir.")
    }
    else{
        uyariGoster("danger", "Temizlenecek Halihazırda Kaydedilmiş Bir Yapılacak Bulunmamaktadır.");
    }
}
function arayuzdenYapilacagiKaldir(e){
    console.log(e.target);
    if(e.target.className === "fa fa-remove"){
        const yapilacak = e.target.parentElement.parentElement;
        yapilacak.remove();
        yerelDepolamadanYapilacagiKaldir(yapilacak.textContent);
        uyariGoster("success", "Yapılacak Başarıyla Kaldırıldı.")
        console.log("Çarpıya basıldı.");
    }
}
function yerelDepolamadanYapilacagiKaldir(kaldirilacakYapilacak) {
    yerelDepolamadanYapilacaklariKontrolEt();
    yapilacaklar.forEach(function(yapilacak, index){ // * yapilacak --> içerik, index --> index numarası.
        if(kaldirilacakYapilacak === yapilacak){
            yapilacaklar.splice(index, 1); // * Kendisini "yapilacaklar" dizesinden siler.
        }
    })
    localStorage.setItem("yapilacaklar", JSON.stringify(yapilacaklar));
}
function sayfaYuklendiginde(){
    yerelDepolamadanYapilacaklariKontrolEt();
    yapilacaklar.forEach(function(yapilacak){
        console.log(yapilacak);
        arayuzeYapilacakEkle(yapilacak);
    });
}
function yapilacakEkle(e){
    // * Arayüz ve Yerel Depolamaya ekleme.
    const girisMetni = girisEkle.value.trim();
    if(girisMetni == null || girisMetni == ""){
        //alert("Lütfen yapılacak eklemeden önce yapılacağın ismini belirleyiniz.");
        uyariGoster("danger" ,"Lütfen Yapılacak Eklemeden Önce Yapılacağın İsmini Belirleyiniz.");
    }
    else{
        arayuzeYapilacakEkle(girisMetni);
        yerelDepolamayaYapilacakEkle(girisMetni);
        uyariGoster("primary", "Yapilacak Listeye Eklendi.");
    }
    console.log("Submit olayı çalıştı.");
    e.preventDefault();
}
function arayuzeYapilacakEkle(yeniYapilacak){
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = yeniYapilacak;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove"

    a.appendChild(i);
    li.appendChild(a);
    yapilacaklarListesi.appendChild(li);

    girisEkle.value = "";
}
function yerelDepolamayaYapilacakEkle(yeniYapilacak){
    yerelDepolamadanYapilacaklariKontrolEt();
    yapilacaklar.push(yeniYapilacak);
    localStorage.setItem("yapilacaklar", JSON.stringify(yapilacaklar));
}
function yerelDepolamadanYapilacaklariKontrolEt(){
    if(localStorage.getItem("yapilacaklar") === null){
        yapilacaklar = [];
    }
    else{
        yapilacaklar = JSON.parse(localStorage.getItem("yapilacaklar"));
    }
}
function uyariGoster(tip, ileti){
    const div = document.createElement("div");
    div.className = `alert alert-${tip}`; // * Dostum bu çok havalı!
    div.textContent = ileti;
    ilkKartGovdesi.appendChild(div);

    setTimeout(function(){
        div.remove();
    }, bekleme);
}