function flip( b ) {
  $.each(b, function(i,bit){ bit.reverse(); });
  json = JSON.stringify(b, undefined, 4);
    json = json.replace( /",\n(\s)*/g, '", ' ).
                replace( /\[\n\s*"/g, '[ "' ).
                replace( /"\n\s*\]/g, '" ]' );
    return json;
}
