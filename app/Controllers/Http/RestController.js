'use strict'

const Case = use('App/Models/Case')
const Country = use('App/Models/Country')
const DailyCase = use('App/Models/DailyCase')
const DailyOverview = use('App/Models/DailyOverview')

const Database = use('Database')


class RestController {

    async dataSummary({request, response}){

        var dataSummary = await DailyOverview.query().select('cases','deaths','recovered').first()

        return response.status(200).json(dataSummary)

    }

    async dataOneMonth({request, response})
    {
        var data = await Case.query().groupBy('date').
        select(Database.raw('date, date as date')).
        select(Database.raw('cases, sum(cases) as cases')).
        select(Database.raw('recovered, sum(recovered) as recovered')).
        select(Database.raw('deaths, sum(deaths) as deaths')).
        orderBy('id','ASC').
        fetch()
        return response.status(200).json(data)
    }

    async RenderCHartPie({request, response})
    {

        var dataSummary = await DailyOverview.query().select('cases','deaths','recovered').first()
        return response.status(200).json([

            dataSummary.cases, dataSummary.deaths, dataSummary.recovered

        ])
    }

}

module.exports = RestController
