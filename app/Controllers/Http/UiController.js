'use strict'

const Case = use('App/Models/Case')
const Country = use('App/Models/Country')
const DailyCase = use('App/Models/DailyCase')
const DailyOverview = use('App/Models/DailyOverview')

class UiController {


    async index({view, request, response}){

        
        var dateNow = new Date().toISOString().slice(0,10)
        var dataSummary = await DailyOverview.query().
        select('cases','deaths','recovered').
        where('dates',dateNow).
        first()

        var dataCase =  await DailyCase.query().
        orderBy('cases','DESC').
        where('dates',dateNow).
        fetch()

        return await view.render('index',{

            title : "Covid-19 Monitoring",
            dataSummary : dataSummary.toJSON(),
            dataCaseNow : dataCase.toJSON(),
            
            num : 0

        });

    }

    async staticCountry({view, request, response}){

        var params = request.params
        var country = params.country
        var dateNow = new Date().toISOString().slice(0,10)
        var cases = await Case.query().
        select('country','cases','deaths','recovered','date').
        innerJoin('countries','countries.id','=','caselists.country_id').
        where('countries.country',country).
        orderBy('caselists.id','DESC').fetch()

        var getCountryData = await DailyCase.query().
        select('country','cases','todayCases','deaths','todayDeaths','recovered','active','critical','casesPerOneMillion','deathsPerOneMillion','dates','iso2').
        where('dates',dateNow).
        where('country',country).first()
        
       
        return await view.render('staticCountry',{

            title : "Covid-19 in "+country ,
            country : country,
            Summary: getCountryData,
            dataTable : cases.toJSON()
            
        });
    }

}

module.exports = UiController
