(function ( $ ) {
	$.fn.maskvalue = function( options ){

		var settings = $.extend( {
			maskfunc: function() {
				var val = $(this).val();
				if( /[A-Za-z]\d{9}/.test( val ) )
					return val.replace( /.{4}$/, new Array(4+1).join('*') );
			}
		}, options );

		return this.filter(':text[name]').each(function(){
			var $this = $(this);
			console.log($this);
			if( !!$this.data('maskvalue') )
				return true;
			var $shadow = $('<input type="text" class="maskvalue-shadow" readonly />').val( settings.maskfunc.call( $this ) ).data( 'maskvalue', $this ).insertAfter( $this );
			$this.data( 'maskvalue', $shadow ).hide();
			$this.blur(function(){
				var $this = $(this);
				$this.toggle().data( 'maskvalue' ).val( settings.maskfunc.call( $this ) ).toggle();
			});
			$shadow.on('click select', function(){
				var $this = $(this);
				$this.toggle().data( 'maskvalue' ).toggle().focus().setCursorPosition( $this.getCursorPosition() );
			});
		});
	};
	// http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
	$.fn.getCursorPosition = function() {
		var input = $(this).get(0);
		if (!input) return; // No (input) element found
		if (input.setSelectionRange) {
			// Standard-compliant browsers
			return input.selectionStart;
		} else if (document.selection) {
			// IE
			input.focus();
			var sel = document.selection.createRange();
			var selLen = document.selection.createRange().text.length;
			sel.moveStart('character', -input.value.length);
			return sel.text.length - selLen;
		}
	}
	$.fn.setCursorPosition =  function (pos){
		var input = $(this).get(0);
		if (!input) return; // No (input) element found
		if(input.createTextRange){
			var textRange = input.createTextRange();
			textRange.collapse(true);
			textRange.moveEnd(pos);
			textRange.moveStart(pos);
			textRange.select();
			return true;
		}else if(input.setSelectionRange){
			input.focus();
			input.setSelectionRange(pos,pos);
			return true;
		}
		return false;
	}
}( jQuery ));
