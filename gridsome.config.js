// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'All About Erik',
  titleTemplate: `%s | All About Erik`,
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-171601307-1'
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
    {
      use: 'gridsome-plugin-netlify-cms-paths',
      options: { 
        contentTypes: ['NavMenuItem'] 
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/navMenuItems/**/*.md',
        typeName: 'NavMenuItem'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/homePg.md',
        typeName: 'HomePage'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/roots-and-youth.md',
        typeName: 'RootsAndYouth'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/the-episodes.md',
        typeName: 'TheEpisodes'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/musical-friends.md',
        typeName: 'MusicalFriends'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/friends/*.md',
        typeName: 'Friends'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/nadia-music.md',
        typeName: 'NadiaMusic'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/eduardo-unz-music.md',
        typeName: 'EduardoUnzMusic'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/early-productions.md',
        typeName: 'EarlyProductions'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/musical-journey/discography.md',
        typeName: 'Discography'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/short-films.md',
        typeName: 'ShortFilms'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/travels.md',
        typeName: 'Travels'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/collections-index.md',
        typeName: 'CollectionsIndex'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/collections/*.md',
        typeName: 'Collections'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/collections/old-time-sportsmen.md',
        typeName: 'OldTimeSportsmen'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/publications-index.md',
        typeName: 'PublicationsIndex'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/publications/*.md',
        typeName: 'Publications'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/archives-index.md',
        typeName: 'ArchivesIndex'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/archives/*.md',
        typeName: 'Archives'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/archives/narrative/*.md',
        typeName: 'ArchivesNarrative'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/archives/narrative-gallery/*.md',
        typeName: 'ArchivesNarrativeGallery'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/data/pages/contact.md',
        typeName: 'Contact'
      }
    },
  ]
}