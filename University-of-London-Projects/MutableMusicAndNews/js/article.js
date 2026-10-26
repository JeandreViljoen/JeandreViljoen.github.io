//Simple data structure for Article details

export class Article
{
    constructor(_date, _articleType, _title, _subTitle, _artist, _author, _featureIMG, _featureIMGalt, _featureVideoURL, _description, _smLinkFacebook, _smLinkInstagram, _smLinkYoutube, _genre)
    {
        this.date = _date;
        this.articleType = _articleType;
        this.title = _title;
        this.subTitle = _subTitle;
        this.artist = _artist;
        this.author = _author;
        this.featureIMG = _featureIMG;
        this.featureIMGalt = _featureIMGalt;
        this.featureVideoURL = _featureVideoURL;
        this.description = _description;
        this.smLinkFacebook = _smLinkFacebook;
        this.smLinkInstagram = _smLinkInstagram;
        this.smLinkYoutube = _smLinkYoutube;
        this.genre = _genre;
    }
}