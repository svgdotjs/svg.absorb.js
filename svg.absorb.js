// svg.absorb.js 0.1.2 - Copyright (c) 2014 Wout Fierens - Licensed under the MIT license
;(function() {

  SVG.Absorbee = SVG.invent({
    // Create js wrapper
    create: function(node) {
      this.node = node
      this.type = node.localName
      this.node.instance = this
    }

    // Inherit from SVG.Element
  , inherit: SVG.Element

    // How the element is constructed
  , construct: {
      // Add absorb method to container elements
      absorb: function(raw) {
        if (typeof raw === 'string') {
          /* create temporary div to receive svg content */
          var i
            , well = document.createElement('div')

          /* strip away newlines and properly close tags */
          raw = raw
            .replace(/\n/, '')
            .replace(/<(\w+)([^<]+?)\/>/g, '<$1$2></$1>')

          /* ensure SVG wrapper for correct element type cating */
          well.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + raw + '</svg>'

          /* transplant content from well to target */
          for (i = well.firstChild.childNodes.length - 1; i >= 0; i--)
            if (well.firstChild.childNodes[i].nodeType == 1)
              this.add(new SVG.Absorbee(well.firstChild.childNodes[i]), 0)
          
          /* mark temporary div for garbage collection */
          well = null

        } else {
          this.add(new SVG.Absorbee(raw))
        }
        
        return this
      }
    }

  })

}).call(this);