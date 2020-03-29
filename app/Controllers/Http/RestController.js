'use strict'

const Case = use('App/Models/Case')
const Country = use('App/Models/Country')
const DailyCase = use('App/Models/DailyCase')
const DailyOverview = use('App/Models/DailyOverview')
var each = require('foreach');

const Database = use('Database')


class RestController {

    async dataSummary({request, response}){

        var dateNow = new Date().toISOString().slice(0,10)
        var dataSummary = await DailyOverview.query().
        select('cases','deaths','recovered').
        where('dates',dateNow)
        first()

        return response.status(200).json(dataSummary)

    }

    async dataOneMonth({request, response})
    {
        var data = await Case.query().groupBy('date').
        select(Database.raw('date, date as date')).
        select(Database.raw('cases, sum(cases) as cases')).
        select(Database.raw('recovered, sum(recovered) as recovered')).
        select(Database.raw('deaths, sum(deaths) as deaths')).
        where(Database.raw('DATEDIFF(date,NOW()) >= -30')).
        orderBy('id','ASC').
        fetch()
        return response.status(200).json(data)
    }

    async RenderCHartPie({request, response})
    {
        var dateNow = new Date().toISOString().slice(0,10)
        var dataSummary = await DailyOverview.query().
        select('cases','deaths','recovered').
        where('dates',dateNow).first()

        return response.status(200).json([

            dataSummary.cases, dataSummary.deaths, dataSummary.recovered

        ])
    }


    async getDataCountry({request, response})
    {

        var params = request.params
        var country = params.country
        if(country == "USA")
        {
            var country = "US"
        }
        var cases = await Case.query().
        select('cases','deaths','recovered','date').
        innerJoin('countries','countries.id','=','caselists.country_id').
        where(Database.raw('DATEDIFF(date,NOW()) >= -30')).
        where('countries.country',country).
        orderBy('caselists.id','ASC').fetch()

        return cases;
    }

    async getDataCountryPie({ request, response })
    {
        var dateNow = new Date().toISOString().slice(0,10)
        var params = request.params
        var country = params.country

        var dataSummary = await DailyCase.query().
        select('cases','deaths','recovered','active','critical').
        where('dates',dateNow).
        where('country',country).
        first()

        var datas = [ dataSummary.cases, dataSummary.deaths, dataSummary.recovered, dataSummary.active, dataSummary.critical ]
        return response.status(200).json(datas)
    }

}

module.exports = RestController
