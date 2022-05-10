import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

import { AuthService } from '../../auth/auth.service';
import { PostService } from '../../services/post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  isAuth
  isloading = false;
  url: string
  error: any
  postId: string;
  post: Post;
  userId: String;
  userIsAuthenticated: boolean
  private authStatusSub: Subscription;
  who: string
  profile: any
  comments : String[] = ["This is a good blog","Wonderful Thoughts","I found this blog very interesting"," Very cool ","Awesome and cool blog"]
  Person= ["Adarsh Kumar" , "Keshav Mittal" , "Abhinav Singh", "Abhimanyu Kumar", "Avishek Roy" ]
  rand : Number[] = []
  comment: String = '';
  new_com: String = '';
  

    myperson:any = this.Person[Math.floor(Math.random() * this.Person.length)]

    // console: any.log(myperson)//This gives you any string from groceries

  constructor(
    public postsService: PostService,
    public route: ActivatedRoute,
    public router: Router,
    private authService: AuthService,
    public profileService:ProfileService
  ) { }

  commenting(){
    // document.getElementById("comment")= "";
    this.new_com = this.comment
    this.who = "By Keshav Mittal"
    const comm = document.getElementById('avishek')
    // comm.comment = "";

    // this.Person.push(this.new_com.toString())
  }


  showcc(){

    var x = document.getElementById("mydiv");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  myper(){
      return Math.floor(Math.random() * this.Person.length)
  }

  myfn(){
    var a = Math.floor(Math.random() * this.Person.length);
    if(this.rand.includes(a) == false){
        this.rand.push(a)
        return a
        
    }
    if(this.rand.includes(a) == true){
      return this.myfn()
    }
  }

  ngOnInit(): void {
    this.url = this.router.url.split("/")[1]
    
    this.authData()
    this.getErrors()

    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has("postId")) {
        this.postId = paramMap.get("postId");
        this.getPostById(this.postId)
      }
    })
  }

  authData() {
    this.isAuth = this.authService.getIsAuth()
    this.userId = this.authService.getUserId();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }
  getErrors() {
    this.error = null
    this.postsService.err.subscribe(err => {
      this.error = err
      this.isloading = false

    })

  }

  getPostById(id) {
    this.isloading = true
    this.postsService.getPost(this.postId).subscribe(postData => {
      console.log(postData)
      this.post = {
        id: postData._id,
        title: postData.title,
        content: postData.content,
        imagePath: postData.imagePath,
        creator: postData.creator,
        postDate:postData.postDate
      };
      this.getPostUserByCreatorId(postData.creator) 

      // this.compareIds(this.userId,this.post.creator)
      this.isloading = false
    })
    e => {
      this.isloading = false
      this.error = e
    }
  }



  OnDelete(postId: string) {
    this.postsService.deletePost(postId);
  }


  getPostUserByCreatorId(id) {
    this.profileService.getPostUserByCreatorId(id).subscribe(profile => {
      if (profile.profile) {
        this.profile= profile.profile
      }else{
      }
    },e=>{
      this.isloading = false
    })

  }

  getcommentById(id) {
    this.isloading = true
    this.postsService.getPost(this.postId).subscribe(postData => {
      console.log(postData)
      this.post = {
        id: postData._id,
        title: postData.title,
        content: postData.content,
        imagePath: postData.imagePath,
        creator: postData.creator,
        postDate:postData.postDate
      };
      this.getPostUserByCreatorId(postData.creator) 

      // this.compareIds(this.userId,this.post.creator)
      this.isloading = false
    })
    e => {
      this.isloading = false
      this.error = e
    }
  }

  ngOnDestroy() {

    this.authStatusSub.unsubscribe();
  }
}
