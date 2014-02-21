// svg.absorb.js 0.1.0 - Copyright (c) 2014 Wout Fierens - Licensed under the MIT license
;(function() {

	SVG.Absorbee = SVG.invent({
		// Create js wrapper
		create: function(node) {
			this.node = node
			this.type = node.localName
			this.node.instance = this
		}

		// How the element is constructed
	, construct: {
      // Add absorb method to container elements
      absorb: function(raw) {
        if (typeof raw === 'string') {
          /* create temporary div to receive svg content */
          var i
            , well = document.createElement('div')

          /* properly close svg tags and add them to the DOM */
          well.innerHTML = raw
            .replace(/\n/, '')
            .replace(/<(\w+)([^<]+?)\/>/g, '<$1$2></$1>')

          /* transplant content from well to target */
          for (i = well.childNodes.length - 1; i >= 0; i--)
            if (well.childNodes[i].nodeType == 1)
              this.add(new SVG.Absorbee(well.childNodes[i]), 0)
          
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