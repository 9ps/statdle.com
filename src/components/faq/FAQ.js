import React from "react";
import "./faq.scss";
import DataTableTop from "../table/DataTableTop";
import { COUNTRYEMOJI } from "../../assets/data";
import Twemoji from "react-twemoji";

const FAQ = ({ toggleModal }) => {
  return (
    <>
      <DataTableTop toggleModal={toggleModal} />
      <article className="faq__container">
        <h1>Frequently Asked Questions</h1>
        <p>
          Suggest further questions in the{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLSf9NfB5E7mMjUAhYh-GrwS8uS1s3jZRQQ9dAP8_DB4OKmU16w/viewform?usp=sf_link"
          >
            Feedback Form
          </a>
        </p>

        <time>Updated: 2025-02-02</time>
        <h2>Randomness</h2>
        <p>
          The secret country and categories are chosen randomly selected daily
          at <em>midnight</em>. Games in progress at that time will continue
          until you refresh the page. Repeats are possible, however should
          rarely occur.
        </p>
        <p>Categories are chosen within the following groups:</p>
        <table>
          <thead>
            <th colspan="2">Category Groups</th>
          </thead>
          <tr>
            <td>1</td>
            <td>Name Alphabetically </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Capital information</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Indicators of Big/Small or Rich/Poor</td>
          </tr>
          <tr>
            <td>4</td>
            <td>All other categories</td>
          </tr>
        </table>
        <p>
          This groups ensure a mix of category difficulties and purpose. With 25
          categories, 330 category combinations, and 194 potential countries,{" "}
          <em>there are 64,020 unique games</em>.
        </p>
        <h2>Best First Guess</h2>
        <p>
          For the 330 category combinations,
          <em> 40 unique countries are the best first guess.</em> Read on for
          further analysis:
        </p>
        <h3>Average Category Rank</h3>
        <p>
          We add up the difference of a countries rank to the median rank, #97,
          for all 15 categories, where lower is better.
        </p>
        <table>
          <thead>
            <th>#</th>
            <th>Country</th>
            <th>Avg. Rank</th>
          </thead>
          <tr>
            <td>1</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["TN"] || ""}
              </Twemoji>
              <span>Tunisia</span>
            </td>
            <td>48</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["LA"] || ""}
              </Twemoji>
              <span>Laos</span>
            </td>
            <td>51</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["EC"] || ""}
              </Twemoji>
              <span>Ecuador</span>
            </td>
            <td>52</td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["AZ"] || ""}
              </Twemoji>
              <span>Azerbaijan</span>
            </td>
            <td>53</td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["DO"] || ""}
              </Twemoji>
              <span>Dominican Republic</span>
            </td>
            <td>54</td>
          </tr>
          <tr className="tr__blank">
            <td colspan="3">···</td>
          </tr>
          <tr>
            <td>194</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["AD"] || ""}
              </Twemoji>
              <span>Andorra</span>
            </td>
            <td>119</td>
          </tr>
        </table>
        <h3>Best Guess Count</h3>
        <p>
          How many times a country is the best guess of each 330 combinations.
          17% of the time, Libya is the best guess!
        </p>
        <table>
          <thead>
            <th>#</th>
            <th>Country</th>
            <th>Count</th>
          </thead>
          <tr>
            <td>1</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["LY"] || ""}
              </Twemoji>
              <span>Libya</span>
            </td>
            <td>57</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["LA"] || ""}
              </Twemoji>
              <span>Laos</span>
            </td>
            <td>35</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["LS"] || ""}
              </Twemoji>
              <span>Lesotho</span>
            </td>
            <td>30</td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["MX"] || ""}
              </Twemoji>
              <span>Mexico</span>
            </td>
            <td>26</td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["JM"] || ""}
              </Twemoji>
              <span>Jamaica</span>
            </td>
            <td>24</td>
          </tr>
        </table>
        <h3>Top 20 Best Guess Count</h3>
        <p>
          How many times a country is the one of the top 20 guesses for each of
          the 330 combinations. 42 countries never recieve this honor.
        </p>
        <table>
          <thead>
            <th>#</th>
            <th>Country</th>
            <th>Count</th>
          </thead>
          <tr>
            <td>1</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["LY"] || ""}
              </Twemoji>
              <span>Libya</span>
            </td>
            <td>198</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["LB"] || ""}
              </Twemoji>
              <span>Lebanon</span>
            </td>
            <td>184</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["JM"] || ""}
              </Twemoji>
              <span>Jamaica</span>
            </td>
            <td>178</td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["LA"] || ""}
              </Twemoji>
              <span>Laos</span>
            </td>
            <td>168</td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["MM"] || ""}
              </Twemoji>
              <span>Myanmar</span>
            </td>
            <td>161</td>
          </tr>
        </table>
        <h3>Average Category Combination Rank</h3>
        <p>
          We average the ranks of each country for all 330 combinations, where
          lower is better.
        </p>
        <table>
          <thead>
            <th>#</th>
            <th>Country</th>
            <th>Avg. Rank</th>{" "}
          </thead>
          <tr>
            <td>1</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["LB"] || ""}
              </Twemoji>
              <span>Lebanon</span>
            </td>
            <td>26</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["LA"] || ""}
              </Twemoji>
              <span>Laos</span>
            </td>
            <td>29</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["LY"] || ""}
              </Twemoji>
              <span>Libya</span>
            </td>
            <td>32</td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["JM"] || ""}
              </Twemoji>
              <span>Jamaica</span>
            </td>
            <td>34</td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["MM"] || ""}
              </Twemoji>
              <span>Myanmar</span>
            </td>
            <td>35</td>
          </tr>
          <tr className="tr__blank">
            <td colspan="3">···</td>
          </tr>
          <tr>
            <td>194</td>
            <td>
              <Twemoji className="emoji emoji--medium">
                {COUNTRYEMOJI["AD"] || ""}
              </Twemoji>
              <span>Andorra</span>
            </td>
            <td>184</td>
          </tr>
        </table>
        <h2>Valid Countries Left</h2>
        <p>
          This metric indicates how many countries remain as potential solutions
          given the information provided by previous guesses. The best guesses
          will reduce the amount of valid countries remaining the most.
        </p>
        <h2>Hints</h2>
        <p>
          Several hint options are provided if you are stuck. If you use a hint,
          it will be recorded in the Score History section of the results page.
        </p>
        <h3>Reveal Secret Country Ranks</h3>
        <p>
          Displays the target country's ranking for each of the four revealed
          categories.
        </p>
        <h3>Make 2nd Best Guess</h3>
        <p>
          Guesses a country (that isn't the secret country) that would most
          effectively narrow down the remaining possibilities. This focuses on
          reducing the range of all the categories, with earlier ones having
          more importance. This is avaliable after a guess is made.
        </p>
        <h3>Reveal Valid Country List</h3>
        <p>
          Shows all remaining possible countries, including the target country.
          This is avaliable when fewer than 50 valid countries remain.
        </p>
        <h2>Category Requirements</h2>
        <p>
          To be included in the game, a category dataset must meet the following
          criteria:
        </p>
        <ul>
          <li>
            Contains all 194 Statdle countries (UN states + Palestine), and uses
            UN borders
          </li>
          <li>Does not group dependencies with parent countries</li>
          <li>There are no duplicate values for countries</li>
        </ul>
        <h2>Future Categories</h2>
        <p>
          Categories I might consider adding in the future when I can be
          bothered / find the complete data for them. Feel free to suggest
          categories to add in the feedback form!
        </p>
        <ul>
          <li>Average Flag Brightness/Hue</li>
          <li>Roadway Km's</li>
          <li>Average Height</li>
          <li>World Risk Index</li>
          <li>Border Length</li>
          <li>More weather based categories</li>
          <li>A more accurate average elevation</li>
        </ul>

        <h2>How does Capital Bearing Work</h2>
        <p>
          Imagine you get on a boat leaving the Tema port in Ghana, travelling
          directly south into the Atlantic Ocean. Eventually, you reach the
          water buoy at the (0,0) point of the world, where the equator meets
          the prime meridan. You then get a compass and record the direction to
          every capital city starting from 0° North.
        </p>
      </article>
    </>
  );
};

export default FAQ;
