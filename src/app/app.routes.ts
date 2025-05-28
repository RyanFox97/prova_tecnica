import { Routes } from '@angular/router';
import { TableComponent } from './component/table/table.component';

export const routes: Routes = [
    {path: "repos", component: TableComponent},
    {path: "commit", component: TableComponent},
];
