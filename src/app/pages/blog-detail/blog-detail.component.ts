import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Blog } from '../../core/models/blog';
import { BlogService } from '../../core/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-blog-detail',
  standalone: false,
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {

  blog!: Blog;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private blogService: BlogService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const blogId = +params['id'];
      this.blogService.getById(blogId).subscribe(res => {
        this.blog = res;
      });
    });
  }

  get safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.blog.content!);
  }

}
