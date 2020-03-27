'use strict'

const Case = use('App/Models/Case')
const Country = use('App/Models/Country')
const DailyCase = use('App/Models/DailyCase')
const DailyOverview = use('App/Models/DailyOverview')

class UiController {


    async index({view, request, response}){

        

        var dataSummary = await DailyOverview.query().select('cases','deaths','recovered').first()
        var dataCase =  await DailyCase.query().orderBy('cases','DESC').fetch()

        return await view.render('index',{

            title : "Covid-19 Datalist",
            dataSummary : dataSummary.toJSON(),
            dataCaseNow : dataCase.toJSON(),
            
            num : 0

        });

    }

}

module.exports = UiController
