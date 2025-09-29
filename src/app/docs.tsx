const Docs = () => {
  return (
    <section className="prose-pre:bg-secondary prose-pre:shadow-md prose-headings:mt-0 prose-pre:border prose-pre:rounded-none max-w-none prose-pre:text-secondary-foreground prose">
      <h1>Docs</h1>

      <p>API to query country information from a local dataset.</p>

      <h2>Endpoint</h2>

      <pre>
        <code className="http">{`GET /api/countries?q={query}`}</code>
      </pre>

      <h2>Query Parameters</h2>

      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>"exact"</td>
            <td>
              Exact match (case-sensitive) for <code>name</code>,{' '}
              <code>alpha2</code>, <code>alpha3</code>, <code>localName</code>,
              or <code>numeric</code>.
            </td>
          </tr>
          <tr>
            <td>@observer</td>
            <td>
              Returns only UN observer countries (<code>UN_observer: true</code>
              ).
            </td>
          </tr>
          <tr>
            <td>@null</td>
            <td>
              Returns countries with any field set to <code>null</code>.
            </td>
          </tr>
          <tr>
            <td>@repeat</td>
            <td>Returns countries with repeated values in any field.</td>
          </tr>
          <tr>
            <td>any other string</td>
            <td>
              Partial, case-insensitive match in any field (<code>name</code>,{' '}
              <code>alpha2</code>, <code>alpha3</code>, <code>localName</code>,{' '}
              <code>numeric</code>).
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Response</h2>

      <p>
        Content-Type: <code>application/json</code>
      </p>
      <p>Body: Array of country objects</p>

      <pre>
        <code className="json">
          {`[
  {
    "name": "Spain",
    "alpha2": "ES",
    "alpha3": "ESP",
    "localName": "España",
    "numeric": 724,
    "UN_observer": false
  }
]`}
        </code>
      </pre>

      <h2>Sorting</h2>

      <ul>
        <li>Non-UN observers first, then UN observers.</li>
        <li>
          Within each group, sorted alphabetically by <code>name</code>.
        </li>
      </ul>

      <h2>Example Requests</h2>

      <p>Partial match:</p>

      <pre>
        <code className="http">{`GET /api/countries?q=esp`}</code>
      </pre>

      <p>
        Returns all countries whose name, code, or numeric value contains "esp"
        (case-insensitive).
      </p>

      <p>UN observers only:</p>

      <pre>
        <code className="http">{`GET /api/countries?q=@observer`}</code>
      </pre>

      <p>Returns only UN observer countries.</p>

      <h2>Credits</h2>

      <p>
        Documentation generated automatically by{' '}
        <strong>ChatGPT (GPT-5)</strong>.
      </p>
    </section>
  )
}

export default Docs
