<template>
  <Layout>
    <transition name="page" mode="out-in">
      <div :key="'publication_' + titleSlug">
        <!-- Need a unique key for the transition above to work on route change -->

        <img
          v-if="node.pageBgImg != ''"
          :src="node.pageBgImg"
          id="pageBgImg"
          :style="pageBgStyles"
        />

        <!-- Header for OLD TIMEY SPORTSMEN -->
        <header
          v-if="title == 'Old Timey Sportsmen'"
          id="header"
          :style="headerStyles"
        >
          <b-container fluid>
            <b-row align-v="center" style="min-height: 215px">
              <b-col
                v-if="node.headerLeftImg != ''"
                align-self="center"
                class="headerImageCol"
                style="text-align: right"
              >
                <g-image
                  alt="Hunter"
                  :src="node.headerLeftImg"
                  id="headerLeftImg"
                />
              </b-col>

              <b-col class="sportsmenHeaderMainCol" align-self="end">
                <g-image
                  :src="node.titleImg1Line"
                  class="titleImg titleImg1Line pt-3"
                />
                <g-image
                  :src="node.titleImg2Lines"
                  class="titleImg titleImg2Lines sportsmen2LineTitleImg"
                />

                <div v-html="node.content" class="publication_headerText" />

                <b-row
                  align-v="start"
                  align-h="center"
                  style="min-height: 68px; padding-top: 8px"
                >
                  <b-col>
                    <a
                      href="http://oldtimeysportsmenphotogallery.com/gallery/"
                      target="_blank"
                      class="sportsmenLinkText"
                      style="margin: 0 auto"
                      @mouseover="updateSportsmenGalleryHover(true)"
                      @mouseleave="updateSportsmenGalleryHover(false)"
                    >
                      <div
                        v-if="windowWidth > 350"
                        style="padding-bottom: 66px"
                      >
                        <span
                          >SEE MORE OF THE COLLECTION, CLICK FOR A NEW TAB</span
                        >
                        <br /><span class="line2"
                          >Old-Time Sportsmen Gallery</span
                        >
                      </div>
                      <div v-else style="padding-bottom: 66px">
                        <span
                          >SEE MORE OF THE COLLECTION, CLICK FOR A NEW TAB</span
                        >
                        <br /><span class="line2"
                          >Old-Time Sportsmen <br />Gallery</span
                        >
                      </div>

                      <g-image
                        v-show="sportsmenGalleryHover"
                        class="headerHoverImg"
                        alt="Guns crossed"
                        :src="node.headerHoverImg"
                      />
                    </a>
                  </b-col>
                </b-row>
              </b-col>

              <b-col
                v-if="node.headerRightImg != ''"
                align-self="center"
                class="headerImageCol"
                style="text-align: left"
              >
                <g-image
                  alt="ducks"
                  :src="node.headerRightImg"
                  id="headerRightImg"
                />
              </b-col>
            </b-row>
          </b-container>
        </header>

        <!-- Header for OTHER PAGES -->
        <header v-else id="header" :style="headerStyles">
          <div class="headerItems">
            <g-image :src="titleImg1Line" class="titleImg titleImg1Line pt-3" />
            <g-image :src="titleImg2Lines" class="titleImg titleImg2Lines" />

            <div v-html="node.content" class="publication_headerText" />
            <div
              v-if="node.volumeInfo != ''"
              v-html="node.volumeInfo"
              class="publication_headerText pt-1"
            />
          </div>
        </header>

        <!-- MAIN CONTENT -->
        <b-container
          fluid
          class="py-3 py-md-4 px-3 px-md-5"
          data-testid="main-content"
        >
          <b-row no-gutters align-v="start" align-h="center">
            <b-col cols="">
              <g-link
                :to="'/publications/' + prevPublication.link"
                v-b-tooltip.hover="{ variant: 'secondary' }"
                :title="prevPublication.title"
                class="nav_link nav_link_small"
                id="nav_prev"
              >
                <g-image
                  immediate
                  alt="previous"
                  src="../assets/images/previous-publication-2lines-white.png"
                  class="hideOnHover"
                />
                <g-image
                  immediate
                  alt="previous"
                  src="../assets/images/previous-publication-2lines-yellow.png"
                  class="showOnHover"
                />
              </g-link>

              <g-link
                :to="'/publications/' + prevPublication.link"
                v-b-tooltip.hover="{ variant: 'secondary' }"
                :title="prevPublication.title"
                class="nav_link nav_link_big"
                id="nav_prev"
              >
                <g-image
                  immediate
                  alt="previous"
                  src="../assets/images/previous-publication-1line-white.png"
                  class="hideOnHover"
                />
                <g-image
                  immediate
                  alt="previous"
                  src="../assets/images/previous-publication-1line-yellow.png"
                  class="showOnHover"
                />
              </g-link>
            </b-col>

            <b-col
              cols="11"
              sm="11"
              lg="8"
              xl="7"
              order="3"
              order-lg="2"
              class="pt-3 pb-3 pt-sm-0"
              id="mainCol"
            >
              <BookViewer
                :pages="bookImagesUrlsStdRes"
                :pagesHiRes="bookImagesUrlsHiRes"
                :isFullscreen="isBookFullscreen"
                :viewportHeight="bookVpHeight"
                :showSinglePage="bookShowSinglePage"
                :key="'bookViewer' + bookKey"
                @toggleFullscreen="toggleFullscreen()"
                @reload="reloadBook()"
              />

              <div
                v-if="title != 'Old Timey Sportsmen'"
                v-html="node.fullTitle"
                class="publication_headerText text-left pt-4"
              />
              <div
                v-if="node.volumeInfo != ''"
                v-html="node.volumeInfo"
                class="publication_headerText text-left pt-2"
              />
              <div class="publication_mainText pt-4">
                {{ node.mainTextTop }}
              </div>
              <div class="publication_mainText pt-4">
                {{ node.mainTextBottom }}
              </div>

              <br />

              <div v-if="node.videoUrl !== ''" id="videoDiv">
                <h2 class="videoTitleText mb-3">
                  WATCH THE VIDEO ABOUT THE BOOK HERE
                </h2>
                <iframe
                  :src="
                    node.videoUrl +
                    '?autoplay=0&color=505050&title=0&byline=0&portrait=0'
                  "
                  style="max-width: 100%"
                  :style="videoFrameStyles"
                  frameborder="0"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen
                >
                </iframe>
              </div>
            </b-col>

            <b-col cols="" order="2" order-lg="3">
              <g-link
                :to="'/publications/' + nextPublication.link"
                v-b-tooltip.hover="{ variant: 'secondary' }"
                :title="nextPublication.title"
                class="nav_link nav_link_small"
                id="nav_next"
              >
                <g-image
                  immediate
                  alt="next"
                  src="../assets/images/next-publication-2lines-white.png"
                  class="hideOnHover"
                />
                <g-image
                  immediate
                  alt="next"
                  src="../assets/images/next-publication-2lines-yellow.png"
                  class="showOnHover"
                />
              </g-link>

              <g-link
                :to="'/publications/' + nextPublication.link"
                v-b-tooltip.hover="{ variant: 'secondary' }"
                :title="nextPublication.title"
                class="nav_link nav_link_big"
                id="nav_next"
              >
                <g-image
                  immediate
                  alt="next"
                  src="../assets/images/next-publication-1line-white.png"
                  class="hideOnHover"
                />
                <g-image
                  immediate
                  alt="next"
                  src="../assets/images/next-publication-1line-yellow.png"
                  class="showOnHover"
                />
              </g-link>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col>
              <g-link
                :to="{ path: '/publications/', query: { playMusic: 'false' } }"
                class="nav_link nav_link_big"
                id="nav_back"
              >
                <g-image
                  immediate
                  alt="Back to publications menu"
                  src="../assets/images/back-to-publications-menu-1line-white.png"
                  class="hideOnHover"
                />
                <g-image
                  immediate
                  alt="Back to publications menu"
                  src="../assets/images/back-to-publications-menu-1line-yellow.png"
                  class="showOnHover"
                />
              </g-link>

              <g-link
                :to="{ path: '/publications/', query: { playMusic: 'false' } }"
                class="nav_link nav_link_small"
                id="nav_back"
              >
                <g-image
                  immediate
                  alt="Back to publications menu"
                  src="../assets/images/back-to-publications-menu-3lines-white.png"
                  class="hideOnHover"
                />
                <g-image
                  immediate
                  alt="Back to publications menu"
                  src="../assets/images/back-to-publications-menu-3lines-yellow.png"
                  class="showOnHover"
                />
              </g-link>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </transition>
  </Layout>
</template>


<page-query>
query ($id: ID!) {
  Publication: publications(id: $id) {
    title
    fullTitle
    volumeInfo
    titleImg1Line
    titleImg2Lines
    titleImg2LinesConcise
    headerBgImg
    headerBgImgOpacity
    headerLeftImg
    headerRightImg
    headerHoverImg
    content
    pageBgImg
    pageBgImgOpacity
    mainTextTop
    mainTextBottom
    videoUrl
    bookImages {
      commonPathStdRes
      commonFilenameStdRes
      commonPathHiRes
      commonFilenameHiRes
      commonFilenameStartNum
      commonFilenameLastNum
      orientation
      width
      height
    }
  }
}
</page-query>

<static-query>
{
  Publications: allPublicationsIndex {
    edges {
      node {
        publications {
          title
        }
      }
    }
  }	
}
</static-query>


<script scoped>
import BookViewer from "../components/BookViewer.vue";
const slugify = require("@sindresorhus/slugify");
const MarkdownIt = require("markdown-it");

export default {
  metaInfo() {
    return {
      title: this.title,
    };
  },

  components: {
    BookViewer,
  },

  data() {
    return {
      imageIndex: 0,
      showIntro: false,
      sportsmenGalleryHover: false,
      windowWidth: 0.0,
      isBookFullscreen: false,
      bookShowSinglePage: false,
      bookKey: 1,
      mainColWidth: 900,
    };
  },

  computed: {
    node() {
      return this.$page.Publication;
    },
    title() {
      return this.node.title;
    },
    titleSlug() {
      return slugify(this.title);
    },
    titleImg1Line() {
      return this.node.titleImg1Line !== ""
        ? this.node.titleImg1Line
        : this.node.titleImg2Lines;
    },
    titleImg2Lines() {
      let titleImg2LinesConcise = Array.isArray(this.node.titleImg2LinesConcise)
        ? this.node.titleImg2LinesConcise[0]
        : this.node.titleImg2LinesConcise; // due to some unknown issue this field is coming out as an array

      if (
        (this.titleSlug === "animal-myth-and-magic" &&
          this.windowWidth < 576) ||
        (this.titleSlug.substring(0, 7) === "shamans" && this.windowWidth < 768)
      ) {
        return titleImg2LinesConcise !== ""
          ? titleImg2LinesConcise
          : this.node.titleImg2Lines;
      } else {
        return this.node.titleImg2Lines;
      }
    },
    headerBgImgOpacity() {
      return this.node.hasOwnProperty("headerBgImgOpacity")
        ? this.node.headerBgImgOpacity
        : 0.5;
    },
    headerStyles() {
      return {
        "--headerBgImg": "url(" + this.node.headerBgImg + ")",
        "--bgOpacity": this.headerBgImgOpacity / 100,
      };
    },
    pageBgStyles() {
      let css = {};
      css.opacity = this.node.pageBgImgOpacity / 100;
      return css;
    },
    publications() {
      return this.$static.Publications.edges[0].node.publications;
    },
    publication_names() {
      return this.publications.map((x) => x.title);
    },
    publicationIndex() {
      return this.publication_names.indexOf(this.title);
    },
    prevPublication() {
      const i = this.publicationIndex;
      if (i === 0) var prev_i = this.publication_names.length - 1;
      else prev_i = i - 1;
      let publication = { ...this.publications[prev_i] };
      publication.link = slugify(publication.title);
      return publication;
    },
    nextPublication() {
      const i = this.publicationIndex;
      if (i === this.publication_names.length - 1) var next_i = 0;
      else next_i = i + 1;
      let publication = { ...this.publications[next_i] };
      publication.link = slugify(publication.title);
      return publication;
    },
    bookImagesUrlsStdRes() {
      let pages = [null]; // first element is null so that cover page appears on its own
      const book = this.node.bookImages;
      let urlCommon = book.commonPathStdRes + book.commonFilenameStdRes;
      for (
        let i = book.commonFilenameStartNum;
        i <= book.commonFilenameLastNum;
        i++
      ) {
        let url = urlCommon + i + ".jpg";
        pages.push(url);
      }
      return pages;
    },
    bookImagesUrlsHiRes() {
      let pages = [null]; // first element is null so that cover page appears on its own
      const book = this.node.bookImages;
      let urlCommon = book.commonPathHiRes + book.commonFilenameHiRes;
      for (
        let i = book.commonFilenameStartNum;
        i <= book.commonFilenameLastNum;
        i++
      ) {
        let url = urlCommon + i + ".jpg";
        pages.push(url);
      }
      return pages;
    },
    bookVpHeight() {
      const pageWidth = this.node.bookImages.width;
      const pageHeight = this.node.bookImages.height;

      if (this.windowWidth > 1200) {
        // show double pages
        const twoPagesWidth = 2 * pageWidth;
        let actualWidth = Math.min(twoPagesWidth, this.mainColWidth);
        var actualHeight = (actualWidth / twoPagesWidth) * pageHeight;
        this.bookShowSinglePage = false;
      } else {
        // show single pages
        let actualWidth = Math.min(pageWidth, this.mainColWidth);
        actualHeight = (actualWidth / pageWidth) * pageHeight;
        this.bookShowSinglePage = true;
      }
      return actualHeight + "px";
    },
    videoFrameStyles() {
      const maxVidWidth = 954.656;
      const maxVidHeight = 537;

      let actualWidth =
        maxVidWidth < this.mainColWidth ? maxVidWidth : this.mainColWidth;
      let actualHeight = (actualWidth / maxVidWidth) * maxVidHeight;
      return {
        width: actualWidth + "px",
        height: actualHeight + "px",
      };
    },
  },

  watch: {
    windowWidth: function (val) {
      this.sportsmenGalleryHover = val < 1400;

      this.updateMainColWidth();

      this.reloadBook();
    },
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    this.updateMainColWidth();

    window.addEventListener("resize", () => {
      if (this.windowWidth != window.innerWidth) {
        this.windowWidth = window.innerWidth;
      }
    });
    window.addEventListener("orientationchange", () => {
      this.windowWidth = window.innerWidth;
    });
  },

  methods: {
    renderMarkdown(text) {
      const md = new MarkdownIt();
      return md.render(text);
    },
    updateSportsmenGalleryHover(val) {
      if (this.windowWidth >= 1400) this.sportsmenGalleryHover = val;
    },
    toggleFullscreen() {
      this.isBookFullscreen = !this.isBookFullscreen;
      this.reloadBook();
    },
    reloadBook() {
      this.bookKey += 1; // increment component key to force reload between toggle of fullscreen / normal-screen
    },
    updateMainColWidth() {
      let element = document.getElementById("mainCol");
      let elemRect = element.getBoundingClientRect();
      this.mainColWidth = elemRect.width;
    },
  },
};
</script>



<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap");
@import url("https://fonts.googleapis.com/css?family=Francois+One&display=swap");

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url("../assets/fonts/nhaasgrotesktxpro-55rg.eot"); /* IE9 Compat Modes */
  src: url("../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../assets/fonts/nhaasgrotesktxpro-55rg.woff")
      format("woff"),
    /* Pretty Modern Browsers */
      url("../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg")
      format("svg"); /* Legacy iOS */
  font-weight: normal;
}
@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url("../assets/fonts/nhaasgrotesktxpro-65md.eot"); /* IE9 Compat Modes */
  src: url("../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../assets/fonts/nhaasgrotesktxpro-65md.woff")
      format("woff"),
    /* Pretty Modern Browsers */
      url("../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg")
      format("svg"); /* Legacy iOS */
  font-weight: normal;
}

.layout {
  padding: 0;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
}

#pageBgImg {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
  width: auto;
  height: auto;
  min-height: 100%;
  min-width: 100%;
  overflow: hidden;
  z-index: -1;
}

#header {
  position: relative;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}
#header:after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--headerBgImg) no-repeat center;
  background-size: cover;
  opacity: var(--bgOpacity);
  width: 100%;
  height: 100%;
  z-index: -1;
  transform: translate3d(
    0,
    0,
    0
  ); // Needed to fix an issue on iOS where the header image disappears
}

#headerLeftImg {
  min-width: 230px;
  max-width: 70%;
  max-height: 189px;
}
#headerRightImg {
  min-width: 230px;
  max-width: 70%;
  max-height: 149px;
}

.headerItems {
  width: 1240px;
  max-width: 90vw;
  text-align: center;
  margin: 0 auto;
}
.publication_headerText {
  color: #ffffff;
  font-family: "NeueHaasGroteskText Pro65";
  font-feature-settings: "liga";
  font-weight: 500;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  letter-spacing: 5px;
  text-align: center;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.18);
  text-transform: uppercase;
  margin: 0px;
  padding: 0px;
  &:first-of-type {
    letter-spacing: 8px;
  }
}

.sportsmenHeaderMainCol {
  width: 1240px;
  max-width: 970px;
  text-align: center;
  margin: 0 auto;
}
.sportsmenLinkText {
  color: #000;
  font-family: "Francois One", sans-serif;
  font-feature-settings: "liga";
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: 0.8px;
  text-align: center;
  line-height: 20px;
  margin: 0px;
  padding: 0px;
  width: 397px;
  display: block;
  cursor: pointer;
}
.sportsmenLinkText .line2 {
  font-size: 1.125rem;
}

.headerHoverImg {
  display: block;
  position: absolute;
  bottom: 0;
}

.titleImg {
  max-width: 100%;
  margin-bottom: 8px;
}
.titleImg1Line {
  display: inline;
}
.titleImg2Lines {
  display: none;
}
.sportsmen2LineTitleImg {
  max-width: 396px;
}

.nav_link {
  color: white;
  font-family: "Ubuntu Condensed", sans-serif;
  font-feature-settings: "liga";
  font-weight: 400;
  font-style: italic;
  font-size: 1.75rem;
  letter-spacing: 1px;
  line-height: 2.1875rem;
  text-shadow: 1px 1px 2px rgba(28, 16, 23, 0.83);
  margin: 0px;
  padding: 0px;
  width: fit-content;
  z-index: 1000;
}
#nav_prev {
  text-align: left;
  padding-left: var(--linkGutter);
}
#nav_next {
  text-align: right;
  float: right;
  padding-right: var(--linkGutter);
}
#nav_back {
  text-align: center;
  padding: 0 20px;
  width: 100%;
}

.publication_mainText {
  font-family: "NeueHaasGroteskText Pro55", sans-serif;
  font-feature-settings: "liga";
  font-weight: 400;
  text-align: justify;
  color: #ffffff;
  font-size: 1.1875rem;
  line-height: 1.9375rem;
  letter-spacing: 1px;
  text-shadow: 0px 0px 14px rgba(0, 0, 0, 0.19),
    0px 0px 14px rgba(0, 0, 0, 0.19) /* glow */,
    0px 0px 29px rgba(0, 0, 0, 0.57) /* drop shadow*/;
  /* See styles.css for further styles */
}

#readMoreText {
  cursor: pointer;
  font-size: 1.0625rem;
  color: #f4f4f4;
}

#videoDiv {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}
.videoTitleText {
  font-family: "Ubuntu Condensed", sans-serif;
  font-feature-settings: "liga";
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  font-size: 1.75rem;
  line-height: 2rem;
  letter-spacing: 1px;
}

/* To fix poor scroll speed using "background-size: cover" and "background-attachment: fixed"
Ref: https://www.fourkitchens.com/blog/article/fix-scrolling-performance-css-will-change-property/ */
.layout::before {
  content: " ";
  position: fixed; /* instead of background-attachment */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
  background-size: cover;
  will-change: transform; /* creates a new paint layer */
  z-index: -1;
}

/* Transition styles on router-view for fading the page */
.page-enter-active {
  transition-duration: 5.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-leave-active {
  transition-duration: 1.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
  }
  .headerItems {
    padding: 0px 60px;
  }
  .publication_headerText {
    font-size: 0.875rem;
    line-height: 1.25rem;
    &:first-of-type {
      letter-spacing: 7px;
    }
  }
  .sportsmenHeaderMainCol {
    max-width: 100%;
    padding: 0px 60px;
  }
  .sportsmenLinkText,
  .sportsmenLinkText img,
  .sportsmen2LineTitleImg {
    max-width: 100%;
  }
  .sportsmenLinkText img {
    margin-left: -15px;
  }
  .publication_mainText {
    font-size: calc(
      1rem + 2 * (100vw - 375px) / (576 - 375)
    ); /* varies between 16px (1rem) and 18px */
    line-height: calc(
      1.0625rem + 7 * (100vw - 375px) / (576 - 375)
    ); /* varies between 17px (1.0625rem) and 24px */
  }
  #readMoreText {
    font-size: calc(
      0.875rem + 2 * (100vw - 375px) / (576 - 375)
    ); /* varies between 14px (0.875rem) and 16px */
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
    padding: 0px;
  }
  .headerItems {
    padding: 0px 80px;
  }
  .publication_headerText {
    font-size: 0.9375rem;
    line-height: 1.325rem;
    &:first-of-type {
      letter-spacing: 7px;
    }
  }
  .publication_mainText {
    font-size: calc(
      1.125rem + 1 * (100vw - 576px) / (768 - 576)
    ); /* varies between 18px (1.125rem) and 19px */
    line-height: calc(
      1.5rem + 12 * (100vw - 576px) / (768 - 576)
    ); /* varies between 24px (1.5rem) and 32px */
  }
  #readMoreText {
    font-size: calc(
      1rem + 1 * (100vw - 576px) / (768 - 576)
    ); /* varies between 16px (1rem) and 17px */
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
  }
  .headerItems {
    padding: 0px 120px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
  }
  .headerItems {
    padding: 0px 120px;
  }
  .nav_link_small {
    display: block;
  }
  .nav_link_big {
    display: none;
  }
}

/* Special - Larger devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) and (max-width: 1499.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
  }
  .headerItems {
    padding: 0px 130px;
  }
}

/* Special */
@media only screen and (min-width: 1200px) {
  #mainCol {
    margin: 0 40px;
  }
}

/* Special */
@media only screen and (max-width: 1399.98px) {
  .headerImageCol {
    display: none;
  }
}

/* Special */
@media only screen and (max-width: 1889.98px) {
  .nav_link_small#nav_prev,
  .nav_link_small#nav_next {
    display: block;
  }
  .nav_link_big#nav_prev,
  .nav_link_big#nav_next {
    display: none;
  }
}
</style>
