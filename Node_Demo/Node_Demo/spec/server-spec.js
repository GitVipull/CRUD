describe("Main Test Suits", function(){
	it("Check is the test is Hello world", function(done){
		let txt="Hello World";
		expect(txt).toBe("Hello World");
		done();
	});
	
	it("Check for anaother value", function(done){
		let txt="Hello";
		expect(txt).toBe("Hello World");
		done();
	});

});