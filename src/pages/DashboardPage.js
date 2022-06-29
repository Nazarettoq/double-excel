import { Page } from "@core/Page"
import {$} from "@core/dom"
import { tableList } from "./dashboard.functions"
export class DashboardPage extends Page {
  getRoot() {
    const date= Date.now().toString()
    return $.create('div', 'db').html(`    <div class="db__header"></div>
    <div class="db__new">
        <div class="db__view">
            <a href="#excel/${date}" class="db__create">
                New <br/>Table
            </a>
        </div>
    </div>
    ${tableList()}
    `)
  }
}
