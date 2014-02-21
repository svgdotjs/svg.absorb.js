describe('absorb()', function() {
  var nested
    , inline = document.getElementById('InlineSvg')
    , fullSvg = '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"    width="500px" height="500px" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve"><line id="line1234" fill="none" stroke="#FF7BAC" stroke-width="20" stroke-linecap="round" stroke-miterlimit="10" x1="138.682" y1="250" x2="293.248" y2="95.433"/><rect id="rect1235" x="22.48" y="19.078" fill="#F7931E" stroke="#C1272D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="94.972" height="94.972"/><path id="path1236" opacity="0.5" fill="#29ABE2" d="M189.519,131.983c0,5.523-4.477,10-10,10H92.257c-5.523,0-10-4.477-10-10V53.659 c0-5.523,4.477-10,10-10h87.262c5.523,0,10,4.477,10,10V131.983z"/><circle id="circle1237" opacity="0.8" fill="#8CC63F" cx="201.603" cy="159.508" r="69.067"/><polygon id="polygon1238" fill="none" stroke="#8C6239" stroke-width="20" stroke-linecap="round" stroke-miterlimit="10" points="286.331,287.025  227.883,271.365 212.221,212.915 255.009,170.127 313.459,185.789 329.119,244.237 "/></svg>'
    , singleSvg = '<rect id="rect1235" x="22.48" y="19.078" fill="#F7931E" stroke="#C1272D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="94.972" height="94.972"/>'
    , multipleSvg = '<rect width="100" height="200" fill="#f06"></rect><circle r="200" opacity="0.5"></circle>'

  beforeEach(function() {
    nested = draw.clear().nested()
  })

  describe('with raw svg', function() {
    it('adds all given nodes to the target element when a full svg is given', function() {
      nested.absorb(fullSvg)
      expect(nested.node.childNodes.length).toBe(1)
      expect(nested.node.firstChild.localName).toBe('svg')
      expect(nested.get(0).type).toBe('svg')
      expect(nested.children().length).toBe(1)
    })
    it('adds the given node to the target element when a single svg element is given', function() {
      nested.absorb(singleSvg)
      expect(nested.node.childNodes.length).toBe(1)
      expect(nested.node.firstChild.localName).toBe('rect')
      expect(nested.get(0).type).toBe('rect')
      expect(nested.children().length).toBe(1)
    })
    it('adds the given nodes to the target element when multiple svg elements are given', function() {
      nested.absorb(multipleSvg)
      expect(nested.node.childNodes.length).toBe(2)
      expect(nested.node.childNodes[0].localName).toBe('rect')
      expect(nested.get(0).type).toBe('rect')
      expect(nested.node.childNodes[1].localName).toBe('circle')
      expect(nested.get(1).type).toBe('circle')
      expect(nested.children().length).toBe(2)
    })
    it('wraps absorbed elements into the SVG.Absorbee class', function() {
      nested.absorb(multipleSvg)
      expect(nested.get(0) instanceof SVG.Absorbee).toBe(true)
      expect(nested.get(1) instanceof SVG.Absorbee).toBe(true)
    })
  })

  describe('with existing inline svg', function() {
    it('adds the given element to the targeted element', function() {
      nested.absorb(inline)
      expect(nested.node.childNodes.length).toBe(1)
      expect(nested.node.firstChild.localName).toBe('svg')
      expect(nested.children().length).toBe(1)
    })
    it('wraps absorbed element into the SVG.Absorbee class', function() {
      nested.absorb(inline)
      expect(nested.get(0) instanceof SVG.Absorbee).toBe(true)
    })
  })

})