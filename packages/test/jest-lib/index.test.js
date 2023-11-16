it("节流throttle", (done) => {
  const { throttle } = require("@kady/lib");
  const mockFn = jest.fn();

  const fn = throttle(mockFn, 1000);
  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toBe(1);
    done();
  }, 5000);
});
