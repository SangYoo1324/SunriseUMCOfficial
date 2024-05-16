import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer-bar w-[100%]">
      <div class="footer-con h-full">
        <div class="footer_Sitemap">
          <div class="sitemap_title_wrap flex">
            <h1>Sitemap</h1>
          </div>
          <div class="ul_wrap flex">
            <ul class="sitemap_wrap">
              <li><a routerLink="/visitorsInfo">Visitor Info</a></li>
              <li><a routerLink="/childrenYouth">Children & Youth</a></li>
              <li><a routerLink="/ministries">Ministries</a></li>
              <li><a routerLink="/newsActivities">News & Activities</a></li>
              <li><a routerLink="/controlPanel">Admin Access</a></li>
            </ul>
            <!--        <ul class="sitemap_wrap">-->
            <!--          <li><a href="">Contact</a></li>-->
            <!--          <li><a href="">Contributors</a></li>-->
            <!--          <li><a href="">Admin</a></li>-->
            <!--        </ul>-->
          </div>
        </div>
        <div class="direction">
          <div class="direction_wrap">
            <h1>Direction</h1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2706.6048749348156!2d-122.33502242389933!3d47.282978010269666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54905634558a3399%3A0xfefcd956cb335da7!2sSunrise%20United%20Methodist%20Church!5e0!3m2!1sen!2sus!4v1686801635040!5m2!1sen!2sus"
              width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>


        </div>


      </div>
    </footer>

  `,
  imports: [
    RouterLink
  ],
  styles: [`
    /*footer */
    .footer-con {
      display: flex;
      background-color: #000000;

    }

    .footer_logo_wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
    }

    .footer_logo_wrap > img {
      width: auto;
      height: 220px;
    }

    .footer_Sitemap {
      flex-grow: 1.3;
      font-size: 20px;
      color: #F4F3EA;
      margin-left: 6%;
    }

    .sitemap_title_wrap > h1 {
      font-size: 25px;
      font-weight: bold;
      padding: 20px 20px;
    }

    .sitemap_wrap > li {
      padding: 5px 15px;
    }

    .ul_wrap {
      margin-bottom: 30px;
    }

    .sitemap_wrap {
      margin-left: 15px;
    }

    .direction {
      flex-grow: 1;
    }

    .direction_wrap {
      width: 90%;
      margin: 15px auto;
    }

    .direction_wrap > h1 {
      font-weight: bold;
      font-size: 25px;
      color: #F4F3EA;
      padding: 10px 10px;

      width: 20%;
    }

    iframe {

      width: 400px;
      height: 150px;
    }

    /*footer:end */

    a {
      text-decoration: none;
      color: white;
    }

    ul {
      padding: 0;
    }

    li {
      list-style: none;

    }


    /*mobile mode */
    @media (max-width: 1024px) {
      .btn_wrap {
        display: none;
      }

      .footer-con {
        height: 85vh;
        display: block;
      }

      iframe {
        margin: 0 auto;
        padding-bottom: 20px;
        padding-right: 0;
        width: 300px;
        height: 200px;

      }

      .direction_wrap {
        width: 90%;
      }

      .direction_wrap > h1 {
        padding: 10px 40px;
        width: 50%;
      }

      iframe {
        padding-bottom: 0;
      }


    }

    /*mobile mode:end */

  `]
})
export class FooterComponent {

}
