'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/','UiController.index')
Route.get('/update/data','ApiController.getData')
Route.get('/update/dailycase','ApiController.getDailyCase')
Route.get('/update/dailyoverview','ApiController.getDailyOverview')



Route.get('/rest/api/dataSummary','RestController.dataSummary');
Route.get('/rest/api/dataOneMonth','RestController.dataOneMonth');
Route.get('/rest/api/PieGlobal','RestController.RenderCHartPie');