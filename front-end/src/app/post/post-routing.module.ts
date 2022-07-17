import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostFormComponent } from "./components/post-form/post-form.component";
import { PostsListComponent } from "./components/posts-list/posts-list.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
    { path: 'create', component: PostFormComponent, canActivate: [AuthGuard] },
    { path: ':id', component: PostDetailsComponent, canActivate: [AuthGuard] },
    { path: '', component: PostsListComponent, canActivate: [AuthGuard] },
]
// , canActivate: [AuthGuard]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PostRoutingModule {}
